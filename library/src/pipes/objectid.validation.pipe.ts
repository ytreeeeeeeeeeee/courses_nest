import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Types, isValidObjectId } from 'mongoose';

@Injectable()
export class ObjectidValidationPipe implements PipeTransform {
  transform(value: any) {
    if (isValidObjectId(value)) {
      if (new Types.ObjectId(value) == value) {
        return value;
      }
    }

    throw new BadRequestException('Transmitted id is not ObjectId');
  }
}
