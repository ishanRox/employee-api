import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, ParseIntPipe, ValidationPipe, UsePipes, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { MongoExceptionFilter } from './filters/mongo-exception.filter';
import { MongoIdValidationPipe } from './pipes/mongo-id-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerCsvConfig } from './multer-config/csv-upload.config';
import { multerImageConfig } from './multer-config/profile-pic-upload.config';
import * as fs from 'fs';
import { HttpService } from '@nestjs/axios';

@Controller('api/employee')
export class EmployeeController {

  constructor(private readonly employeeService: EmployeeService, private readonly httpService: HttpService) { }



  @Post()
  @UseFilters(MongoExceptionFilter)
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get('/profile-pic/:id')
  async downloadImage(@Param('id', MongoIdValidationPipe) id: string,@Res() res) {
    console.log('download image');
    const imagePath:string=await this.employeeService.getProfilePicByUserId(id);
    return res.sendFile(imagePath, { root: './upload/profile-pic' });
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdValidationPipe) id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', MongoIdValidationPipe) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return await this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdValidationPipe) id: string) {
    return this.employeeService.remove(id);
  }

  @Post('upload/csv')
  @UseInterceptors(FileInterceptor('file', multerCsvConfig))
  async uploadCsvFile(@UploadedFile() file: Express.Multer.File) {
    const bulkCreateResult = await this.employeeService.saveCsvDataToDb(file);
    return bulkCreateResult;
  }


  @Post('upload/profile-pic/:id')
  @UseInterceptors(FileInterceptor('file', multerImageConfig))
  async uploadProfilePic(@Param('id') id, @UploadedFile() file: Express.Multer.File) {
    console.log(file.originalname, 'file');
    console.log(file, 'file');
    const result = await this.employeeService.updateProfilePic(file, id);
    return result;
  }



}
