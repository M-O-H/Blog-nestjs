import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { UsersModule } from '@/modules/users/users.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './passport-strategy/local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy, LocalAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
