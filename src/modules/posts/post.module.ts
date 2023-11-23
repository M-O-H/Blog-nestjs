import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DrizzleModule } from '@/database/drizzle.module';
import { PostsRepository } from './post.repository';

@Module({
  imports: [DrizzleModule],
  providers: [PostService, PostsRepository],
  controllers: [PostController],
})
export class PostsModule {}
