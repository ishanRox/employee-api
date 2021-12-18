import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, ParseIntPipe, ValidationPipe, UsePipes } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { MongoExceptionFilter } from './filters/mongo-exception.filter';
import { MongoIdValidationPipe } from './pipes/validation.pipe';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Post()
  @UseFilters(MongoExceptionFilter)
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
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
  update(@Param('id', MongoIdValidationPipe) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', MongoIdValidationPipe) id: string) {
    return this.employeeService.remove(id);
  }
}
