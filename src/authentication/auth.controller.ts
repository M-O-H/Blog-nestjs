import { JwtAuthGuard } from '@/common/guards/jwt-auth.garud';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const userToken = await this.authService.login(req.user);
    return userToken;
  }
  @UseGuards(JwtAuthGuard)
  @Get('/protected')
  async protected(@Request() req) {
    return this.authService.authUser(req.user.id);
  }
}
