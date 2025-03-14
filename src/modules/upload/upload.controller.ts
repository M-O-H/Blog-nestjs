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
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUploadDto } from './dto/create-upload.dto';

@ApiTags('Upload')
@UsePipes(ParseIntPipe)
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) { }

  @UseInterceptors(
    FileInterceptor('cover', {
      storage: postStorage(),
      limits: {
        fileSize: megaToByte(5),
      },
    }),
  )
  @ApiOperation({ summary: 'Upload file' })
  @ApiBody({ description: 'Like data', type: CreateUploadDto })
  @ApiResponse({ status: 201, description: 'File uploaded successfully.' })
  @ApiCreatedResponse({ description: 'Like uploaded successfully.' })
  @ApiNotFoundResponse({ description: 'File upload failed ' })
  @Post('post/:id')
  async upload(
    @Param('id') postId: number,
    @UploadedFile(ParseFiles)
    file: Express.Multer.File,
  ) {
    return await this.uploadService.saveFile(postId, file);
  }

  @ApiOperation({ summary: 'Get iamge a file' })
  @ApiResponse({ status: 200, description: 'Retrive image file' })
  @ApiNotFoundResponse({ description: 'File not found' })
  @Get('files')
  async getAll() {
    return await this.uploadService.findAll();
  }
}
