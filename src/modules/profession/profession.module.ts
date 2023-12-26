import { Module } from '@nestjs/common';
import { ProfessionService } from './profession.service';

@Module({
  providers: [ProfessionService]
})
export class ProfessionModule {}
