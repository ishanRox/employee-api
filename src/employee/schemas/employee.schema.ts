
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({
  timestamps: true
})
export class Employee {
  
  @Prop({required:true})
  firstName: string;

  @Prop({required:true})
  lastName: string;

  @Prop({required:true})
  preferredName: string;

  @Prop({required:true})
  gender: string;

  @Prop({required:true})
  location: string;

  @Prop({required:true})
  description: string;

  @Prop({required:true})
  designation: string;

  @Prop({unique:true})
  workEmail: string;

  @Prop({required:true})
  workPhone: string;

  @Prop({required:true})
  linkedInProfile: string;

  @Prop()
  profilePicture: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);