import {  Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './schemas/employee.schema';
import { MulterModule } from '@nestjs/platform-express';
import { CsvDbSaveModule } from 'src/csv-db-save/csv-db-save.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule,CsvDbSaveModule, MulterModule.register({ 
    limits: {
      fileSize: 5000000
    }
  }), MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }])],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule { }
