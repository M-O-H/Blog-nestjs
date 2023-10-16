import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param' && isNaN(parseInt(value, 10)))
      throw new BadRequestException(
        `validation failed. "${value} is not a number"`,
      );
    return value;
  }
}
