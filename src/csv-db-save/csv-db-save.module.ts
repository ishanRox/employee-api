import { Module } from '@nestjs/common';
import { CsvDbSaveService } from './csv-db-save.service';

@Module({
  providers: [CsvDbSaveService],
  exports:[CsvDbSaveService]
})
export class CsvDbSaveModule {}
