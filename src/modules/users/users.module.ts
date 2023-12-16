import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DrizzleModule } from '@/database/drizzle.module';
import { UsersRepository } from './users.repository';
// import { CheckUserRole } from '@/common/guards/check-role.gaurd';

@Module({
  imports: [DrizzleModule],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
