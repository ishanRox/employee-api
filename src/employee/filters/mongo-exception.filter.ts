import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let message: string = 'Mongo Default Error';

    console.log(exception.code,'exception.code')
    console.log(exception.message,'exception.code')
    console.log(exception.errmsg,'exception.code')

    switch (exception.code) {
      case 11000:
        response.statusCode = HttpStatus.CONFLICT;
        message = 'You are already registered';
        break;

    }

    response
      .json({
        timestamp: new Date().toISOString(),
        message: message
      });
  }
}