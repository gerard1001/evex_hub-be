import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { MigrationService } from '../migration.service';

@Injectable()
export class ProfessionSeed {
  constructor(private readonly migrationService: MigrationService) {}

  @Command({
    command: 'seed:profession',
    describe: 'seed professions',
  })
  async seeds(): Promise<void> {
    const dataString = `
        CREATE (profn1:Profession { id: '298d35b6-6b45-416d-af2d-c959b08c7a06', name: 'Event Planner/Coordinator', description: 'The mastermind behind the event, responsible for overall planning, coordination, and execution' })

        CREATE (profn2:Profession { id: '798eb06c-ccfa-405c-998d-150e0e311f65', name: 'Venue Coordinator', description: 'Manages the logistics of the event venue, ensuring it meets the requirements and is set up appropriately' })

        CREATE (profn3:Profession { id: 'ecb2afeb-ed23-46e1-86d7-8465dc8cc586', name: 'Decorator/Designer', description: 'Enhances the visual appeal of the event by designing and decorating the venue according to the theme or requirements' })

        CREATE (profn4:Profession { id: '8f2f312e-17d2-43ca-8a80-a36d866ec1f6', name: 'Stage Manager', description: 'Oversees everything related to the stage, from setup to scheduling performances and ensuring smooth transitions' })

        CREATE (profn5:Profession { id: '8f70adcc-a715-41b3-9fdf-66a944dbb8b1', name: 'Audio-Visual Technician', description: 'Handles sound systems, lighting, and audio-visual equipment to create a captivating experience for the audience' })

        CREATE (profn6:Profession { id: '456dfedf-0da0-44a3-9c4e-b64c8dab6c23', name: 'MC/Host', description: 'Engages the audience, introduces speakers or performers, and ensures the flow of the event is smooth and entertaining.' })

        CREATE (profn7:Profession { id: 'af30820b-2142-4fa4-b117-3213e3c60edc', name: 'Caterer', description: 'Manages food and beverage services, including menu planning, catering, and ensuring dietary needs are met' })

        CREATE (profn8:Profession { id: '78d51ec0-5908-4adf-a898-8150392054e2', name: 'Photographer/Videographer', description: 'Captures memorable moments of the event through photos and videos, creating lasting memories' })

        CREATE (profn9:Profession { id: '8433d7f1-9523-478d-affa-a7c48215461e', name: 'Security Personnel', description: 'Ensures the safety and security of attendees, staff, and performers during the event' })

        CREATE (profn10:Profession { id: 'd12c9f17-4866-4f1d-8ac2-129ba5703b55', name: 'Transportation Coordinator', description: 'Arranges transportation for guests, performers, and equipment to and from the venue' })

        CREATE (profn11:Profession { id: 'f704994a-edf7-499d-8912-b0adb558a55e', name: 'Graphic Designer', description: 'Creates visual elements such as event logos, banners, and promotional materials' })

        CREATE (profn12:Profession { id: '58dc7c61-ff74-4db1-8233-b6ef318538f1', name: 'Registration Staff', description: 'Manages the registration process, checking in attendees and distributing event materials' })

        CREATE (profn13:Profession { id: '54a8536a-7acf-4b52-a08e-0409423a7aa1', name: 'Clean-up Crew', description: 'Responsible for post-event cleanup, ensuring the venue is returned to its original state' })

        CREATE (profn14:Profession { id: '83246ff0-18b8-4cfa-bee3-6b550ced5b54', name: 'Event Marketing Specialist', description: 'Develops and implements marketing strategies to promote the event and attract attendees' })

        CREATE (profn15:Profession { id: '79af24b4-f82c-4469-8d80-23060c9a0b8c', name: 'Emergency Medical Services', description: 'Provides medical assistance and first aid services in case of emergencies' })

        CREATE (profn16:Profession { id: '606729a0-42b7-488b-81dd-b92b2ca5ecb0', name: 'Sponsorship Coordinator', description: 'Secures sponsorships and partnerships to support the event financially' })

        CREATE (profn17:Profession { id: '593087af-8847-4591-86d5-4ef3d25164b2', name: 'Social Media Manager', description: 'Manages social media accounts, live updates, and engages with the online audience during the event' })

        CREATE (profn18:Profession { id: 'a3fcd848-279e-4e92-8f4f-d6bd795d793e', name: 'Legal Consultant', description: 'Ensures the event complies with legal regulations and assists in obtaining necessary permits' })

        RETURN true
        `;

    try {
      await this.migrationService.seeds(dataString);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Command({
    command: 'remove:profession',
    describe: 'remove professions',
  })
  async remove(): Promise<void> {
    const dataString = `
    MATCH (profession:Profession) DETACH DELETE profession
    `;
    try {
      await this.migrationService.seeds(dataString);
    } catch (error: any) {
      throw new Error(error.message);
    }

    return;
  }
}
