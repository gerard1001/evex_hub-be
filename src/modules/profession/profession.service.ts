import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProfessionInput } from 'src/database/graphql/graphql';
import { QueryRepository } from 'src/database/neo4j/query.repository';
import { generateUuid } from 'src/utils/uuid.util';

@Injectable()
export class ProfessionService {
  constructor(private readonly queryRepo: QueryRepository) {}

  async createProfession(professionInput: ProfessionInput): Promise<any> {
    const { name, description } = professionInput;

    const profession = await this.queryRepo
      .initQuery()
      .raw(
        `
    MERGE (profession:Profession {name: $name})
    ON CREATE SET profession.id = $prfnId
    ON CREATE SET profession.description = $description
    RETURN profession
    `,
        {
          name,
          description,
          prfnId: generateUuid(),
        },
      )
      .run();

    if (profession?.length > 0) {
      const {
        profession: { properties },
      } = profession[0];
      console.log(properties);

      return {
        ...properties,
      };
    }
  }

  async getProfessions(): Promise<any> {
    const prfns = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (prfn:Profession) RETURN prfn 
      `,
      )
      .run();

    if (prfns?.length > 0) {
      const resultArray = [];

      for (let i = 0; i < prfns.length; i++) {
        const obj = {};
        obj['id'] = prfns[i].prfn.properties.id;
        obj['name'] = prfns[i].prfn.properties.name;
        obj['description'] = prfns[i].prfn.properties.description;

        resultArray.push(obj);
      }

      return resultArray;
    }
  }

  async getProfession(id: string): Promise<any> {
    const prfn = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (prfn:Profession {id: $id}) RETURN prfn
        `,
        { id },
      )
      .run();

    if (prfn?.length > 0) {
      const {
        prfn: { properties },
      } = prfn[0];

      return {
        id: properties.id,
        ...properties,
      };
    }
  }
}
