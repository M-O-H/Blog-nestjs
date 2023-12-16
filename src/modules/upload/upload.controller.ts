import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { postStorage } from './upload.storage';
import { megaToByte } from '@/common/utility/sizeConvertor';
import { ParseFiles } from '@/common/pipes/parse-file.pipe';
import { ParseIntPipe } from '@/common/pipes/parse-int.pipe';

@UsePipes(ParseIntPipe)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: postStorage(),
      limits: {
        fileSize: megaToByte(5),
      },
    }),
  )
  @Post('post/:id')
  async upload(
    @Param('id') postId: number,
    @UploadedFile(ParseFiles)
    file: Express.Multer.File,
  ) {
    return await this.uploadService.saveFile(postId, file);
  }

  @Get('files')
  async getAll() {
    return await this.uploadService.findAll();
  }
}
