import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/database/neo4j/query.repository';
import { CreateEventInput } from './types/event.create.types';
import { generateUuid } from 'src/utils/uuid.util';

@Injectable()
export class EventService {
  constructor(private readonly queryRepo: QueryRepository) {}

  async createEvent(createEventInput: CreateEventInput): Promise<any> {
    const { type, prfnIds } = createEventInput;
    const prfnIdArray = prfnIds.split(',');

    const event = await this.queryRepo
      .initQuery()
      .raw(
        `
        MERGE (event:Event {type: $type})
        ON CREATE SET event.id = $eventId
        WITH event
        UNWIND $prfnIdArray AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event)-[:MIGHT_REQUIRE]->(prfn)
        RETURN event
    `,
        {
          type,
          eventId: generateUuid(),
          prfnIdArray,
        },
      )
      .run();

    if (event?.length > 0) {
      const {
        event: { properties },
      } = event[0];

      return {
        ...properties,
      };
    }
  }

  async getEvents(): Promise<any> {
    const events = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (event:Event) RETURN event 
      `,
      )
      .run();

    if (events?.length > 0) {
      const resultArray = [];

      for (let i = 0; i < events.length; i++) {
        const obj = {};
        obj['id'] = events[i].event.properties.id;
        obj['type'] = events[i].event.properties.type;

        resultArray.push(obj);
      }

      return resultArray;
    }
  }

  async getEvent(id: string): Promise<any> {
    const event = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (event:Event {id: $id}) RETURN event
        `,
        { id },
      )
      .run();

    if (event?.length > 0) {
      const {
        event: { properties },
      } = event[0];

      return {
        id: properties.id,
        ...properties,
      };
    }
  }
}
