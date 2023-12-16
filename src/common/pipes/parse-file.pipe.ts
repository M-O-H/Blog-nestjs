import {
  BadRequestException,
  HttpStatus,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import fs from 'fs';
import { extname } from 'path';
import { BusinessException } from '../exceptions/business.exception';
import { getMimeType } from '../utility/mime-type';

export class ParseFiles implements PipeTransform {
  async transform(file: Express.Multer.File) {
    try {
      if (!file) throw new BadRequestException('File is required!');

      const VALID_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
      const VALID_MIME_TYPE = ['image/png', 'image/jpeg'];
      const fileExtension = extname(file.originalname);
      const fileType = file.mimetype;

      if (
        !VALID_EXTENSIONS.includes(fileExtension) ||
        !VALID_MIME_TYPE.includes(fileType)
      )
        throw new UnprocessableEntityException('Invalid file type');

      const fileBuffer = await fs.promises.readFile(file.path);
      const unitArray = new Uint8Array(fileBuffer);
      const bytes: string[] = [];
      unitArray.forEach((uint) => bytes.push(uint.toString(16)));

      const hex = bytes.join('').toUpperCase();
      const mimeType = getMimeType(hex.substring(0, 8));

      if (!VALID_MIME_TYPE.includes(mimeType))
        throw new UnprocessableEntityException('Invalid Mime File Type');

      return file;
    } catch (error) {
      if (error.status == HttpStatus.UNPROCESSABLE_ENTITY)
        await fs.promises.unlink(file.path);
      throw new BusinessException('Upload', error);
    }
  }
}
