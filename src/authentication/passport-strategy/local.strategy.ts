import { User } from '@/common/interface/user.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(); // config
  }
  async validate(usernameOrEmail, password): Promise<User> {
    const user = await this.authService.validationUser(
      usernameOrEmail,
      password,
    );
    if (!user) throw new UnauthorizedException();
    return user; // saved on request as user object
  }
}
