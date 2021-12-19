import { Module } from '@nestjs/common';
import { CsvToJsonService } from './csv-to-json.service';

@Module({
  providers: [CsvToJsonService],
  exports:[CsvToJsonService]
})
export class CsvToJsonModule {}
