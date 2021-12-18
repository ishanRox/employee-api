import { Test, TestingModule } from '@nestjs/testing';
import { CsvDbSaveService } from './csv-db-save.service';

describe('CsvDbSaveService', () => {
  let service: CsvDbSaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CsvDbSaveService],
    }).compile();

    service = module.get<CsvDbSaveService>(CsvDbSaveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
