import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from '../post.controller';

describe('PostsController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // controllers: [controller],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
