import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, IsUrl, Matches } from "class-validator";

export class CreateEmployeeDto {

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

    @IsEmail()
    workEmail: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^\+[1-9]\d{1,14}$/)
    workPhone: string;

    @IsUrl({ message: 'linkedInProfile URL is not valid.' })
    linkedInProfile: string;

    @IsString()
    profilePicture: string;
}
