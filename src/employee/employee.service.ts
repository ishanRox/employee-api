import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CsvDbSaveService } from 'src/csv-to-json/csv-to-json.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee, EmployeeDocument } from './schemas/employee.schema';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);

  constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<EmployeeDocument>,
    private readonly csvToDbService: CsvDbSaveService) { }


  async create(createEmployeeDto: CreateEmployeeDto) {
    const createdEmployee = await this.employeeModel.create(createEmployeeDto);
    this.logger.log(`employee created with id : ${createdEmployee.id}`);
    return createdEmployee;
  }

  async findAll() {
    this.logger.log(`findAll called`);
    return await this.employeeModel.find().exec();
  }

  async findOne(id: string) {
    this.logger.log(`findOne called`);
    const employee: Employee = await this.employeeModel.findById(id).exec();
    this.notFoundException(id, employee);
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    this.logger.log(`update called with id ${id}`);
    const employee: Employee = await this.employeeModel.findByIdAndUpdate(id, updateEmployeeDto,{new: true}).exec();
    this.notFoundException(id, employee);
    return employee;
  }

  async remove(id: string) {
    this.logger.log(`remove employee called with id ${id}`);
    const employeeDeleteResult: Employee = await this.employeeModel.findByIdAndDelete(id).exec();
    this.notFoundException(id, employeeDeleteResult);
    return employeeDeleteResult;
  }

  async saveCsvDataToDb(file: Express.Multer.File) {
    this.logger.log(`saveCsvDataToDb called with file : ${file.filename}`);
    const csvEmployeeArray: [Employee] = await this.csvToDbService.csvToJson(file);
    const employeeCreateRequests = csvEmployeeArray.map(employee => {
      return this.create(employee);
    })
    const result = Promise.allSettled(employeeCreateRequests);
    return result;
  }

  async updateProfilePic(file: Express.Multer.File, userId: string) {
    const employee: Employee = await this.employeeModel.findByIdAndUpdate(userId,
      { "$set": { "profilePicture": file.filename } }).exec();
    this.notFoundException(userId, employee);
    return "profile picture uploded successfully !";
  }

  async getProfilePicByUserId(userId: string) {
    const employee: Employee = await this.findOne(userId);
    if (!employee.profilePicture) {
      throw new NotFoundException(`Profile picture not uploaded for employee with id : ${userId}`);
    }
    return employee.profilePicture;
  }

  private notFoundException(id: string, result: any) {
    if (!result) {
      throw new NotFoundException(`employee Not found for id : ${id}`);
    }
  }
}
