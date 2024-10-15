import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { DrizzleModule } from '@/database/drizzle.module';
import { PostsRepository } from './post.repository';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DrizzleModule,
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('MULTER_DEST'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [PostService, PostsRepository],
  controllers: [PostController],
})
export class PostsModule { }
