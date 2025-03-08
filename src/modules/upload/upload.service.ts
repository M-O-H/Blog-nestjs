import { BusinessException } from '@/common/exceptions/business.exception';
import { BadRequestException, Injectable } from '@nestjs/common';
import fs from 'fs';
import { PostsRepository } from '../posts/post.repository';

@Injectable()
export class UploadService {
  constructor(private readonly postRepository: PostsRepository) { }
  async findAll() {
    const files = await fs.promises.readFile(
      'uploads/',
    );
    return files;
  }

  async saveFile(postId: number, file: Express.Multer.File) {
    try {
      if (!file) throw new BadRequestException('File is required');
      const [updatedPost] = await this.postRepository.update(postId, {
        cover: file.path,
      });
      if (!updatedPost) throw new BadRequestException('Post not found');
      return updatedPost;
    } catch (error) {
      throw new BusinessException('Upload', error, postId);
    }
  }
}
