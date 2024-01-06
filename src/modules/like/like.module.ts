import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { CommentsRepository } from '../comments/comments.repository';
import { PostsRepository } from '../posts/post.repository';
import { LikeRepository } from './like.repository';
import { DrizzleModule } from '@/database/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [LikeController],
  providers: [LikeService, LikeRepository, CommentsRepository, PostsRepository],
})
export class LikeModule {}
