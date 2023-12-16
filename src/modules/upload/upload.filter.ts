import { BadRequestException } from '@nestjs/common';

export function postFilter(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new BadRequestException('Invalid file format'), false);
  }
  cb(null, true);
}
