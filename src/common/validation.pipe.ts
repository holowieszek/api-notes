import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, { metatype }: ArgumentMetadata) {

    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException('Validation failed: No body submitted', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    const parsedErrors = this.formatErrors(errors);

    if (errors.length > 0) {
      throw new HttpException(parsedErrors, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }

  private formatErrors(errors: any[]) {
    const parsedErrors = []
    errors.map(error => {
      for (let property in error.constraints) {
        parsedErrors.push({
            [error.property]: error.constraints[property]
          });
      }
    });
    
    return parsedErrors;
  }

  private isEmpty(value: any) {
    if (Object.keys(value).length > 0) {
      return false;
    }

    return true;
  }
}