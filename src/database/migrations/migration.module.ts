import { Module } from '@nestjs/common';
import { ProfessionSeed } from './seeds/professions.seed';
import { CommandModule } from 'nestjs-command';
import { ConfigModule } from '@nestjs/config';
import { Neo4jModule } from '../neo4j/neo4j.module';
import { ProfessionModule } from 'src/modules/profession/profession.module';
import { EventSeed } from './seeds/events.seed';
import { MigrationService } from './migration.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    Neo4jModule.forRootAsync(),
    CommandModule,
    ProfessionModule,
  ],
  providers: [ProfessionSeed, EventSeed, MigrationService],
})
export class MigrationModule {}
