import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import 'dotenv/config';
@Module({
  imports: [ConfigModule.forRoot(), EmployeeModule,MongooseModule.forRoot(process.env.MONGODB_PATH),  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
