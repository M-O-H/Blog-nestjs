import { IsPublic } from '@/common/decorator/public.decorator';
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './Dtos/sign-up.dto';
@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async sigIn(@Request() req, @Response() res) {
    const userToken = await this.authService.signIn(req.user);

    res.cookie('token', userToken.access_token, {
      httpOnly: true,
      secure: 'asdfa', // TODO: add this to env variables
      maxAge: 60 * 60 * 2000, // 1 hour expiration
      sameSite: 'none',
    });

    return res.status(HttpStatus.OK).json({
      message: 'Login successful',
    });
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto, @Response() res) {
    const userToken = await this.authService.signUp(signUpDto);

    res.cookie('token', userToken.access_token, {
      httpOnly: true,
      secure: 'asdfa', // TODO: add this to env variables
      maxAge: 60 * 60 * 1000, // 1 hour expiration
      sameSite: 'none',
    });

    return res.status(HttpStatus.OK).json({
      message: 'Signup successful',
    });
  }

  @Post('signout')
  async logout(@Response({ passthrough: true }) res) {
    // Clear the cookie
    res.clearCookie('token');
    return { message: 'Logged out successfully' };
  }
}
