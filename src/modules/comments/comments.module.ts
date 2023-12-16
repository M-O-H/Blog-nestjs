import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DrizzleModule } from '@/database/drizzle.module';
import { CommentsRepository } from './comments.repository';
import { PostsRepository } from '../posts/post.repository';
@Module({
  imports: [DrizzleModule],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, PostsRepository],
  exports: [CommentsService],
})
export class CommentsModule {}
