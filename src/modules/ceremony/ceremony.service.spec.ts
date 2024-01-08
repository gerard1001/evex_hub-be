import { Test, TestingModule } from '@nestjs/testing';
import { CeremonyService } from './ceremony.service';

describe('CeremonyService', () => {
  let service: CeremonyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CeremonyService],
    }).compile();

    service = module.get<CeremonyService>(CeremonyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
