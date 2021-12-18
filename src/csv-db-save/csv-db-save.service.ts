import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Employee } from 'src/employee/schemas/employee.schema';

@Injectable()
export class CsvDbSaveService {
    fs = require('fs');
    getStream = require('get-stream');
    parse = require('csv-parser');

    async saveCsvToMongoDb(fileInfo: Express.Multer.File) {
        try {
            let readCSVData = async (path): Promise<any> => {
                const parseStream = this.parse({ delimiter: ',' });
                const data = await this.getStream
                    .array(this.fs.createReadStream(path)
                        .pipe(parseStream));
                return data;
            };

            const employeeArray: [Employee] = await readCSVData(fileInfo.path);

            return employeeArray;

        } catch (error) {
            console.log(error);
            throw new UnprocessableEntityException('csv file data can not be processed !');
        }
    }
}