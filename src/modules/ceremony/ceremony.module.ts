import { Module } from '@nestjs/common';
import { CeremonyService } from './ceremony.service';
import { CeremonyResolver } from './ceremony.resolver';

@Module({
  providers: [CeremonyResolver, CeremonyService],
})
export class CeremonyModule {}
