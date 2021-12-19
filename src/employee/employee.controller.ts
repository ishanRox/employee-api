import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, ParseIntPipe, ValidationPipe, UsePipes, UseInterceptors, UploadedFile, Res, Logger } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { MongoExceptionFilter } from './filters/mongo-exception.filter';
import { MongoIdValidationPipe } from './pipes/mongo-id-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerCsvConfig } from './multer-config/csv-upload.config';
import { multerImageConfig } from './multer-config/profile-pic-upload.config';
import { HttpService } from '@nestjs/axios';

@Controller('api/employee')
export class EmployeeController {
  private readonly logger:Logger = new Logger(EmployeeController.name);

  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  @UseFilters(MongoExceptionFilter)
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    this.logger.log(`create employee endpoint called`);
    return this.employeeService.create(createEmployeeDto);
  }

  @Get('/profile-pic/:id')
  async downloadImage(@Param('id', MongoIdValidationPipe) id: string,@Res() res) {
    this.logger.log(`/profile-pic endpoint called with id : ${id}`);
    const imagePath:string=await this.employeeService.getProfilePicByUserId(id);
    return res.sendFile(imagePath, { root: './upload/profile-pic' });
  }

  @Get()
  async findAll() {
    this.logger.log(`get all employees endpoint called`);
    return await this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', MongoIdValidationPipe) id: string) {
    this.logger.log(`/profile-pic endpoint called with id: ${id}`);
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', MongoIdValidationPipe) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    this.logger.log(`update endpoint called with id : ${id}`);
    return await this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdValidationPipe) id: string) {
    this.logger.log(`delete endpoint called with id : ${id}`);
    return this.employeeService.remove(id);
  }

  @Post('upload/csv')
  @UseInterceptors(FileInterceptor('file', multerCsvConfig))
  async uploadCsvFile(@UploadedFile() file: Express.Multer.File) {
    this.logger.log(`upload/csv endpoint called with file : ${file.filename}`);
    const bulkCreateResult = await this.employeeService.saveCsvDataToDb(file);
    return bulkCreateResult;
  }


  @Post('upload/profile-pic/:id')
  @UseInterceptors(FileInterceptor('file', multerImageConfig))
  async uploadProfilePic(@Param('id', MongoIdValidationPipe) id, @UploadedFile() file: Express.Multer.File) {
    this.logger.log(`uupload/profile-pic endpoint called with id : ${id}`);
    const result = await this.employeeService.updateProfilePic(file, id);
    return result;
  }



}
