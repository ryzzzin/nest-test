import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { validate } from "class-validator";
import { ValidationException } from "src/exceptions/validation.exception";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        
        const obj = plainToInstance(metadata.metatype, value);
        const errors = await validate(obj);

        if(errors.length) {
            let messages = errors.map(error => {
                return Object.values(error.constraints);
            })
            throw new ValidationException(messages);
        }
        return value;
    }
}