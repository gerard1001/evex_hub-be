import { HttpStatus, Injectable } from '@nestjs/common';
import { CeremonyInput } from 'src/database/graphql/graphql';
import { QueryRepository } from 'src/database/neo4j/query.repository';
import { generateUuid } from 'src/utils/uuid.util';

@Injectable()
export class CeremonyService {
  constructor(private readonly queryRepo: QueryRepository) {}

  async createCeremony(ceremonyInput: CeremonyInput): Promise<any> {
    const { host, events, duration, location, date, venue } = ceremonyInput;

    const eventsList = events.split(',');

    const ceremony = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (user:User {id: $host})
        CREATE (ceremony:Ceremony {id: $ceremonyId, duration: $duration, location: $location, date: $date, venue: $venue})
        MERGE (user)-[:HOSTS]->(ceremony)
        WITH ceremony
        UNWIND $eventsList AS eventId
        MATCH (event:Event {id: eventId})
        MERGE (ceremony)-[:Of_TYPE]->(event)
        RETURN ceremony
    `,
        {
          host,
          ceremonyId: generateUuid(),
          duration,
          location,
          date,
          venue,
          eventsList,
        },
      )
      .run();

    if (ceremony?.length > 0) {
      const {
        ceremony: { properties },
      } = ceremony[0];

      return {
        ...properties,
      };
    }
  }

  async deleteCeremonies(): Promise<IResponse> {
    const res = await this.queryRepo
      .initQuery()
      .raw(
        `
      MATCH (cerems:Ceremony) DETACH DELETE cerems
      RETURN TRUE AS res
      `,
      )
      .run();

    console.log(res);

    if (res.length > 0 && res[0]?.res) {
      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully deleted all ceremonies',
      };
    } else {
      throw {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'failed to delete ceremonies',
      };
    }
  }
}
