
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, Logger } from '@nestjs/common';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
    private readonly logger:Logger = new Logger(MongoIdValidationPipe.name);

    transform(value: any, metadata: ArgumentMetadata) {
        var myregexp = /^[0-9a-fA-F]{24}$/;

        if (value.match(myregexp)) {
            // Successful match
            this.logger.log(`valid mongodb id : ${ value }`);
        } else {
            this.logger.log(`invalid mongodb id : ${ value }`);
            throw new BadRequestException('Validation failed (Not a valid employee Id)');
        }
        return value;
    }
}