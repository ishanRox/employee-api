import { Module } from '@nestjs/common';
import { CsvDbSaveService } from './csv-to-json.service';

@Module({
  providers: [CsvDbSaveService],
  exports:[CsvDbSaveService]
})
export class CsvDbSaveModule {}
