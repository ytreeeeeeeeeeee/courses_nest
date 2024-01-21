import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidationWebsocketPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const formattedErrors: { [key: string]: string[] } = {};
      errors.forEach((error) => {
        formattedErrors[error.property] = Object.values(error.constraints);
      });
      throw new WsException(formattedErrors);
    }

    return value;
  }
}
