import {  Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { MulterModule } from '@nestjs/platform-express';
import { CsvToJsonModule } from '../csv-to-json/csv-to-json.module';
import 'dotenv/config';

@Module({
  imports: [CsvToJsonModule, MulterModule.register({ 
    limits: {
      fileSize: +process.env.MAX_FILE_SIZE
    }
  }), MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }])],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule { }
