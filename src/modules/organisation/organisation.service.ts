import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/database/neo4j/query.repository';
import { CreateOrgInput } from './types/organisation.create.types';
import { generateUuid } from 'src/utils/uuid.util';
import { CloudinaryService } from 'src/config/cloudinary/cloudinary.service';
import { OrgPrfnInput } from 'src/database/graphql/graphql';
import { ProfessionService } from '../profession/profession.service';

@Injectable()
export class OrganisationService {
  constructor(
    private readonly queryRepo: QueryRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly professionService: ProfessionService,
  ) {}

  async createOrg(
    orgInput: CreateOrgInput,
    files: Express.Multer.File[],
  ): Promise<any> {
    const { name, type, email, location, phone, media, prfns } = orgInput;

    const emailOrg = await this.findOrgByEmail(email);
    const nameOrg = await this.findOrgByName(name);

    if (!!emailOrg || !!nameOrg) {
      throw new HttpException(
        'Email or name already exists',
        HttpStatus.CONFLICT,
      );
    }

    const objArr = [];

    for (let i = 0; i < prfns.length; i++) {
      const obj = {};
      const imagesArr =
        files &&
        files.filter((file) => file.fieldname === `prfns[${i}][images]`);

      const images = [];
      for (let j = 0; j < imagesArr?.length; j++) {
        const image = imagesArr[j];
        const file =
          files &&
          (await this.cloudinaryService.uploadImage(image).catch((err) => {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
          }));

        images.push(file?.url);
      }

      obj['id'] = prfns[i].split('::')[0];
      obj['experienceTime'] = prfns[i]?.split('::')[1];
      obj['description'] = prfns[i]?.split('::')[2];
      obj['address'] = prfns[i]?.split('::')[3];
      obj['images'] = images;

      objArr.push(obj);
    }

    const imagesArr =
      files && files.filter((file) => file.fieldname === `images`);

    const images = [];
    for (let i = 0; i < imagesArr?.length; i++) {
      const image = imagesArr[i];
      const file =
        files &&
        (await this.cloudinaryService.uploadImage(image).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));

      images.push(file?.url);
    }

    const org = await this.queryRepo
      .initQuery()
      .raw(
        `
        MERGE (org:Organisation { email: $email })
        ON CREATE SET org.id = $orgId,
                      org.type = $type,
                      org.name = $name,
                      org.phone = $phone,
                      org.location = $location,
                      org.images = $images,
                      org.media = $media
        WITH org
        UNWIND $objArr AS obj
        MATCH (prfn:Profession { id: obj.id })
        MERGE (org)-[rel:CAN_OPERATE]->(prfn)
        ON CREATE SET rel.id = $relId,
                      rel.experienceTime = obj.experienceTime,
                      rel.description = obj.description,
                      rel.address = obj.address,
                      rel.images = obj.images
        RETURN org
        `,
        {
          orgId: generateUuid(),
          name,
          type,
          email,
          phone,
          location,
          media,
          images,
          objArr,
          relId: generateUuid(),
        },
      )
      .run();

    if (org?.length > 0) {
      const {
        org: { properties },
      } = org[0];

      return {
        ...properties,
      };
    }
  }

  async getOrgs(): Promise<any> {
    const orgs = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (org:Organisation) RETURN org 
      `,
      )
      .run();

    if (orgs?.length > 0) {
      const resultArray = [];

      for (let i = 0; i < orgs.length; i++) {
        const obj = {};
        obj['id'] = orgs[i].org.properties.id;
        obj['name'] = orgs[i].org.properties.name;
        obj['type'] = orgs[i].org.properties.type;
        obj['email'] = orgs[i].org.properties.email;
        obj['phone'] = orgs[i].org.properties.phone;
        obj['location'] = orgs[i].org.properties.location;
        obj['images'] = orgs[i].org.properties.images;
        obj['media'] = orgs[i].org.properties.media;

        resultArray.push(obj);
      }

      return resultArray;
    }
  }

  async getOrg(id: string): Promise<any> {
    const org = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (org:Organisation {id: $id}) RETURN org
        `,
        { id },
      )
      .run();

    if (org?.length > 0) {
      const {
        org: { properties },
      } = org[0];

      return {
        id: properties.id,
        ...properties,
      };
    }
  }

  async linkProfession(
    orgPrfnInput: OrgPrfnInput,
    files: { images: Express.Multer.File[] },
  ): Promise<any> {
    const { prfnId, orgId, experienceTime, description, address } =
      orgPrfnInput;
    const orgExist = await this.getOrg(orgId);
    if (!orgExist) {
      throw new HttpException(
        'Organisation was not found',
        HttpStatus.NOT_FOUND,
      );
    }
    const prfnExist = await this.professionService.getProfession(prfnId);
    if (!prfnExist) {
      throw new HttpException('Profession was not found', HttpStatus.NOT_FOUND);
    }

    const images = [];
    for (let i = 0; i < files?.images?.length; i++) {
      const image = files && files?.images[i];
      const file =
        files &&
        (await this.cloudinaryService.uploadImage(image).catch((err) => {
          throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }));

      images.push(file?.url);
    }

    const rel = await this.queryRepo
      .initQuery()
      .raw(
        `
      MATCH (org:Organisation { id: $orgId }),
            (prfn:Profession { id: $prfnId })
      MERGE (org) -[rel:CAN_OPERATE]-> (prfn)
      ON CREATE SET rel.id = $relId,
                    rel.experienceTime = $experienceTime,
                    rel.description = $description,
                    rel.images = $images,
                    rel.address = $address
      RETURN rel
      `,
        {
          orgId,
          prfnId,
          relId: generateUuid(),
          experienceTime,
          description,
          images,
          address,
        },
      )
      .run();

    if (rel?.length > 0) {
      const {
        rel: { properties },
      } = rel[0];

      return {
        ...properties,
      };
    }
  }

  async deleteOrgs(): Promise<IResponse> {
    const res = await this.queryRepo
      .initQuery()
      .raw(
        `
      MATCH (orgs:Organisation) DETACH DELETE orgs
      RETURN TRUE AS res
      `,
      )
      .run();

    if (res.length > 0 && res[0]?.res) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully deleted all organisations',
      };
    } else {
      throw {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'failed to delete organisations',
      };
    }
  }

  async findOrgByName(name: string): Promise<any> {
    const org = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (org:Organisation {name: $name}) RETURN org
        `,
        { name },
      )
      .run();

    if (org?.length > 0) {
      const {
        org: { properties },
      } = org[0];

      return {
        id: properties.id,
        ...properties,
      };
    }
  }

  async findOrgByEmail(email: string): Promise<any> {
    const org = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (org:Organisation {email: $email}) RETURN org
        `,
        { email },
      )
      .run();

    if (org?.length > 0) {
      const {
        org: { properties },
      } = org[0];

      return {
        id: properties.id,
        ...properties,
      };
    }
  }
}
