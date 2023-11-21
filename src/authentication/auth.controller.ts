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
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async sigIn(@Request() req, @Response() res) {
    const userToken = await this.authService.signIn(req.user);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      ...userToken,
    });
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto, @Response() res) {
    const token = await this.authService.signUp(signUpDto);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.OK,
      ...token,
    });
  }
}
