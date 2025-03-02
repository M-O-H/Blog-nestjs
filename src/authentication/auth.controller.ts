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
import { LocalAuthGuard } from '@/common/guards/local-auth.guard';
import { IsPublic } from '@/common/decorator/public.decorator';
import { ApiTags, ApiBody, ApiResponse, ApiCookieAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiOperation({ summary: 'sign-In user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async sigIn(@Request() req, @Response() res) {
    const userToken = await this.authService.signIn(req.user);

    res.cookie('token', userToken.access_token, {
      httpOnly: true,
      secure: 'asdfa', // TODO: add this to env variables
      maxAge: 60 * 60 * 2000, // 2 hours expiration
      sameSite: 'none',
    });

    return res.status(HttpStatus.OK).json({
      message: 'Login successful',
    });
  }

  @Post('signup')
  @ApiOperation({ summary: 'sign-Up user' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 200, description: 'Signup successful' })
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
  @ApiOperation({ summary: 'sign-Out user' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  @ApiCookieAuth('token')
  async logout(@Response({ passthrough: true }) res) {
    // Clear the cookie
    res.clearCookie('token');
    return { message: 'Logged out successfully' };
  }
}
