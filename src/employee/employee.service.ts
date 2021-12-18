import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './schemas/employee.schema';

@Injectable()
export class EmployeeService {

  constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>) {}


  async create(createEmployeeDto: CreateEmployeeDto) {
    const createdEmployee = await this.employeeModel.create(createEmployeeDto);
    return createdEmployee;
  }

  async findAll() {
    return await this.employeeModel.find().exec();
  }

  async findOne(id: string) {
    const employee: Employee = await this.employeeModel.findById(id).exec();
    this.notFoundException(id, employee);
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    // const duplicateMail: Employee = await this.employeeModel.findOne({workEmail:updateEmployeeDto.workEmail}).exec();
    // if(duplicateMail){
    //   throw new BadRequestException(`User with Email : ${ updateEmployeeDto.workEmail} already present can not update`);
    // }
    const employee: Employee = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto).exec();
    this.notFoundException(id, employee);
    return employee;
  }

  async remove(id: string) {
    const employeeDeleteResult: Employee = await this.employeeModel.findByIdAndDelete(id).exec();
    this.notFoundException(id, employeeDeleteResult);
    return employeeDeleteResult;
  }

  notFoundException(id: string, result: any) {
    if (!result) {
      throw new NotFoundException(`employee Not found for id : ${id}`);
    }
  }
}
