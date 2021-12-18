import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, IsUrl, Matches } from "class-validator";

export class UpdateEmployeeDto {
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString({ message: 'Must be a string!' })
    lastName: string;

    @IsNotEmpty()
    @IsString({ message: 'Must be a string!' })
    preferredName: string;

    @IsNotEmpty()
    @IsString({ message: 'Must be a string!' })
    gender: string;

    @IsNotEmpty()
    @IsString({ message: 'Must be a string!' })
    location: string;

    @IsNotEmpty()
    @IsString({ message: 'Must be a string!' })
    description: string;

    @IsNotEmpty()
    @IsString({ message: 'Must be a string!' })
    designation: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\+[1-9]\d{1,14}$/,{message:"Must be a valid phone number"})
    workPhone: string;

    @IsUrl({ message: 'linkedInProfile URL is not valid.' })
    linkedInProfile: string;

}
