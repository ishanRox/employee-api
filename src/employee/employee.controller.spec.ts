import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CsvToJsonService } from '../csv-to-json/csv-to-json.service';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from './schemas/employee.schema';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let employeeService: EmployeeService;
  let csvToJsonService: CsvToJsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService,
        {
          provide: getModelToken(Employee.name),
          useValue: Model  // <-- Use the Model Class from Mongoose
        },
        {
          provide: CsvToJsonService,
          useValue: {
            csvToJson: jest.fn().mockImplementation((input) => { }),
          }
        }
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    //service initialize
    employeeService = module.get<EmployeeService>(EmployeeService);
    csvToJsonService = module.get<CsvToJsonService>(CsvToJsonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {
      const result: any = [
        {

          "profilePicture": "f07b9664c87ef43466c906366f9757f2.PNG",
          "linkedInProfile": "https://www.linkedin.com/in/ishan-vimukthi-b4a128173/",
          "workPhone": "+94115628989",
          "workEmail": "abc@gmail.com",
          "designation": "se",
          "description": "hi im ish",
          "location": "colombo",
          "gender": "male",
          "preferredName": "ish",
          "lastName": "vimukthi",
          "firstName": "ishan",

        },
        {
          "profilePicture": "",
          "linkedInProfile": "https://www.linkedin.com/in/ishan-vimukthi-b4a128173/",
          "workPhone": "+94115628989",
          "workEmail": "ab@gmail.com",
          "designation": "se",
          "description": "hi im ish",
          "location": "colombo",
          "gender": "male",
          "preferredName": "ish",
          "lastName": "vimukthi",
          "firstName": "ishan yalu",

        }
      ];
      jest.spyOn(employeeService, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  
});
