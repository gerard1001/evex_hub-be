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
    files: { images: Express.Multer.File[] },
  ): Promise<any> {
    const { name, type, email, location, phone, media, prfns } = orgInput;

    const objArr = [];

    for (let i = 0; i < prfns.length; i++) {
      const obj = {};
      obj['id'] = prfns[i]?.split('::')[0];
      obj['experinceTime'] = prfns[i]?.split('::')[1];
      obj['description'] = prfns[i]?.split('::')[2];

      objArr.push(obj);
    }

    console.log(objArr);

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

    const org = await this.queryRepo
      .initQuery()
      .raw(
        `
        MERGE (org:Organisation { name: $name })
        ON CREATE SET org.id = $orgId,
                      org.type = $type,
                      org.email = $email,
                      org.phone = $phone,
                      org.location = $location,
                      org.media = $media
        WITH org
        UNWIND $objArr AS obj
        MATCH (prfn:Profession { id: obj.id })
        MERGE (org)-[rel:CAN_OPERATE]->(prfn)
        ON CREATE SET rel.id = $relId,
                      rel.experinceTime = obj.experinceTime,
                      rel.description = obj.description
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
        org: { identity, properties },
      } = org[0];

      return {
        id: identity,
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

  async linkProfession(orgPrfnInput: OrgPrfnInput): Promise<any> {
    const { prfnId, orgId, experinceTime, description } = orgPrfnInput;
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
    const rel = await this.queryRepo
      .initQuery()
      .raw(
        `
      MATCH (org:Organisation { id: '${orgId}' })
      MATCH (prfn:Profession { id: '${prfnId}' })
      MERGE (org) -[rel:CAN_OPERATE]-> (prfn)
      ON CREATE SET rel.id = '${generateUuid()}',
                    rel.experinceTime = '${experinceTime}',
                    rel.description = '${description}'
      RETURN rel
      `,
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
}
