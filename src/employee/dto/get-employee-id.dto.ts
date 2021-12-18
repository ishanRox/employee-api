import { IsNotEmpty, IsNumberString, IsString, Matches } from 'class-validator';

export class MongoDbid {

 
  @IsNumberString()
  id: string;
}
