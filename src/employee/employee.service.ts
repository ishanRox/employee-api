import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CsvDbSaveService } from 'src/csv-db-save/csv-db-save.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './schemas/employee.schema';

@Injectable()
export class EmployeeService {

  constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>,
    private readonly csvToDbService: CsvDbSaveService) { }


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
    const employee: Employee = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto).exec();
    this.notFoundException(id, employee);
    return employee;
  }

  async remove(id: string) {
    const employeeDeleteResult: Employee = await this.employeeModel.findByIdAndDelete(id).exec();
    this.notFoundException(id, employeeDeleteResult);
    return employeeDeleteResult;
  }

  async saveCsvDataToDb(file: Express.Multer.File) {
    const csvEmployeeArray: [Employee] = await this.csvToDbService.saveCsvToMongoDb(file);
    const employeeCreateRequests = csvEmployeeArray.map(employee => {
      return this.create(employee);
    })
    const result = Promise.allSettled(employeeCreateRequests);
    return result;
  }

  async updateProfilePic(file: Express.Multer.File, userId: string) {
    console.log(file.filename,'nameeeee');
    
    const employee: Employee = await this.employeeModel.findByIdAndUpdate(userId,
      { "$set": { "profilePicture": file.filename } }).exec();
    console.log(employee, 'result')
    return "profile picture uploded successfully !";
  }

  async getProfilePicByUserId(userId: string) {
    const employee: Employee = await this.findOne(userId);
    return employee.profilePicture;
  }

  notFoundException(id: string, result: any) {
    if (!result) {
      throw new NotFoundException(`employee Not found for id : ${id}`);
    }
  }
}
