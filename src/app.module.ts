import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/post.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './database/drizzle.module';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    CommentsModule,
    DrizzleModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
