
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class MongoIdValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        var myregexp = /^[0-9a-fA-F]{24}$/;

        if (value.match(myregexp)) {
            // Successful match
        } else {
            throw new BadRequestException('Validation failed (Not a valid Id)');
        }
        return value;
    }
}