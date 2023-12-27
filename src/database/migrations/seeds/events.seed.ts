import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { MigrationService } from '../migration.service';

@Injectable()
export class EventSeed {
  constructor(private readonly migrationService: MigrationService) {}

  @Command({
    command: 'seed:event',
    describe: 'seed events',
  })
  async seeds(): Promise<void> {
    const dataString = `
        MERGE (event1:Event { id: 'f9698f27-5bdc-4d02-a211-f6e93a0ef02e', type: 'Weddings' })
        WITH event1
        UNWIND ['ecb2afeb-ed23-46e1-86d7-8465dc8cc586', 'af30820b-2142-4fa4-b117-3213e3c60edc', '78d51ec0-5908-4adf-a898-8150392054e2', '456dfedf-0da0-44a3-9c4e-b64c8dab6c23', '298d35b6-6b45-416d-af2d-c959b08c7a06'] AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event1)-[:MIGHT_REQUIRE]->(prfn)

        MERGE (event2:Event { id: '19038dd3-8fe0-40bb-a3f3-566dc1b701f4', type: 'Corporate Conferences' })
        WITH event2
        UNWIND ['298d35b6-6b45-416d-af2d-c959b08c7a06','8f70adcc-a715-41b3-9fdf-66a944dbb8b1', 'af30820b-2142-4fa4-b117-3213e3c60edc', '8433d7f1-9523-478d-affa-a7c48215461e', '78d51ec0-5908-4adf-a898-8150392054e2'] AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event2)-[:MIGHT_REQUIRE]->(prfn)
        
        MERGE (event3:Event { id: '7705ff67-1df0-49c8-98e1-25e2f0939c46', type: 'Music Concerts' })
        WITH event3
        UNWIND ['8f2f312e-17d2-43ca-8a80-a36d866ec1f6','8f70adcc-a715-41b3-9fdf-66a944dbb8b1',  '8433d7f1-9523-478d-affa-a7c48215461e', '78d51ec0-5908-4adf-a898-8150392054e2'] AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event3)-[:MIGHT_REQUIRE]->(prfn)

        MERGE (event4:Event { id: 'e83cd03c-d760-4f58-b35d-c42cfa54cf0d', type: 'Birthday Parties' })
        WITH event4
        UNWIND ['ecb2afeb-ed23-46e1-86d7-8465dc8cc586', 'af30820b-2142-4fa4-b117-3213e3c60edc',  '78d51ec0-5908-4adf-a898-8150392054e2', '456dfedf-0da0-44a3-9c4e-b64c8dab6c23'] AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event4)-[:MIGHT_REQUIRE]->(prfn)

        MERGE (event5:Event { id: '543c5395-cf0d-4501-aa29-08b3784d7a9f', type: 'Trade Shows/Exhibitions' })
        WITH event5
        UNWIND ['298d35b6-6b45-416d-af2d-c959b08c7a06', '798eb06c-ccfa-405c-998d-150e0e311f65',  'ecb2afeb-ed23-46e1-86d7-8465dc8cc586', '78d51ec0-5908-4adf-a898-8150392054e2', '58dc7c61-ff74-4db1-8233-b6ef318538f1'] AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event5)-[:MIGHT_REQUIRE]->(prfn)

        MERGE (event6:Event { id: '9aa77929-c151-469a-a2ea-d8d85f9e1620', type: 'Fashion Shows' })
        WITH event6
        UNWIND ['298d35b6-6b45-416d-af2d-c959b08c7a06', 'ecb2afeb-ed23-46e1-86d7-8465dc8cc586',  '78d51ec0-5908-4adf-a898-8150392054e2', '456dfedf-0da0-44a3-9c4e-b64c8dab6c23'] AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event6)-[:MIGHT_REQUIRE]->(prfn)

        MERGE (event7:Event { id: '7a8c0cc2-079c-4e92-a8a2-1240315aa967', type: 'Product Launches' })
        WITH event7
        UNWIND ['298d35b6-6b45-416d-af2d-c959b08c7a06', '8f70adcc-a715-41b3-9fdf-66a944dbb8b1',  'af30820b-2142-4fa4-b117-3213e3c60edc', '78d51ec0-5908-4adf-a898-8150392054e2'] AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event7)-[:MIGHT_REQUIRE]->(prfn)
        
        RETURN true
        `;

    const dataString2 = `
                MERGE (event8:Event { id: 'ebf7c17b-810d-4d54-916b-3ea6ce7fc271', type: 'Community Festivals' })
        WITH event8
        UNWIND ['298d35b6-6b45-416d-af2d-c959b08c7a06', 'ecb2afeb-ed23-46e1-86d7-8465dc8cc586',  'af30820b-2142-4fa4-b117-3213e3c60edc', '8433d7f1-9523-478d-affa-a7c48215461e'] AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event8)-[:MIGHT_REQUIRE]->(prfn)

        MERGE (event9:Event { id: '02a3512e-a621-432a-813e-edec0dc383de', type: 'Charity Galas' })
        WITH event9
        UNWIND ['298d35b6-6b45-416d-af2d-c959b08c7a06', 'ecb2afeb-ed23-46e1-86d7-8465dc8cc586',  'af30820b-2142-4fa4-b117-3213e3c60edc', '456dfedf-0da0-44a3-9c4e-b64c8dab6c23'] AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event9)-[:MIGHT_REQUIRE]->(prfn)

        MERGE (event10:Event { id: '50525b5a-20d7-4389-8c2d-4660ea3b56f9', type: 'Networking Events' })
        WITH event10
        UNWIND ['298d35b6-6b45-416d-af2d-c959b08c7a06', '798eb06c-ccfa-405c-998d-150e0e311f65',  '58dc7c61-ff74-4db1-8233-b6ef318538f1', 'af30820b-2142-4fa4-b117-3213e3c60edc'] AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event10)-[:MIGHT_REQUIRE]->(prfn)
        
        MERGE (event11:Event { id: 'bffcba3d-f42a-4448-959a-80c8022c7c79', type: 'Sports Events' })
        WITH event11
        UNWIND ['298d35b6-6b45-416d-af2d-c959b08c7a06', '798eb06c-ccfa-405c-998d-150e0e311f65',  '8433d7f1-9523-478d-affa-a7c48215461e', '8f70adcc-a715-41b3-9fdf-66a944dbb8b1', ''] AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event11)-[:MIGHT_REQUIRE]->(prfn)

        MERGE (event12:Event { id: 'b904a9bd-c43a-42df-a0ce-8c8e1cf8040e', type: 'Art Exhibitions' })
        WITH event12
        UNWIND ['298d35b6-6b45-416d-af2d-c959b08c7a06', '58dc7c61-ff74-4db1-8233-b6ef318538f1',  'ecb2afeb-ed23-46e1-86d7-8465dc8cc586', '78d51ec0-5908-4adf-a898-8150392054e2'] AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event12)-[:MIGHT_REQUIRE]->(prfn)

        MERGE (event13:Event { id: 'fe73284f-72f9-4d45-aabb-3ae93a84f12f', type: 'Conventions' })
        WITH event13
        UNWIND ['298d35b6-6b45-416d-af2d-c959b08c7a06', '798eb06c-ccfa-405c-998d-150e0e311f65',  '58dc7c61-ff74-4db1-8233-b6ef318538f1', '8f70adcc-a715-41b3-9fdf-66a944dbb8b1'] AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event13)-[:MIGHT_REQUIRE]->(prfn)

        MERGE (event14:Event { id: 'af8d05fe-b5be-4418-ace2-128e803cf088', type: 'Baby Showers' })
        WITH event14
        UNWIND ['ecb2afeb-ed23-46e1-86d7-8465dc8cc586', 'af30820b-2142-4fa4-b117-3213e3c60edc',  '456dfedf-0da0-44a3-9c4e-b64c8dab6c23', '78d51ec0-5908-4adf-a898-8150392054e2'] AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event14)-[:MIGHT_REQUIRE]->(prfn)

        MERGE (event15:Event { id: 'e2adbbfa-c2e0-4c0e-b711-5545a3079616', type: 'Tech Conferences' })
        WITH event15
        UNWIND ['298d35b6-6b45-416d-af2d-c959b08c7a06', '58dc7c61-ff74-4db1-8233-b6ef318538f1',  '8433d7f1-9523-478d-affa-a7c48215461e', '8f70adcc-a715-41b3-9fdf-66a944dbb8b1'] AS prfnId
        MATCH (prfn:Profession {id: prfnId})
        MERGE (event15)-[:MIGHT_REQUIRE]->(prfn)
        `;

    try {
      await this.migrationService.seeds(dataString);
      await this.migrationService.seeds(dataString2);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Command({
    command: 'remove:event',
    describe: 'remove events',
  })
  async remove(): Promise<void> {
    const dataString = `
    MATCH (event:Event) DETACH DELETE event
    `;
    try {
      await this.migrationService.seeds(dataString);
    } catch (error: any) {
      throw new Error(error.message);
    }

    return;
  }
}
