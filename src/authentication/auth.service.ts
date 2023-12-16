import { User } from '@/common/interface/user.interface';
import { UsersService } from '@/modules/users/users.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { SignUpDto } from './Dtos/sign-up.dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService,
  ) {}

  async validate(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmailOrUsername(username);
    if (user && user.password == password) {
      delete user.password;
      return user;
    }
    return null;
  }

  async signIn(user: User) {
    return await this.tokenService.generateToken({
      sub: user.id,
      name: user.email,
      role: user.role,
    });
  }

  async signUp(sinUpUser: SignUpDto) {
    try {
      const { id, email, role } = await this.userService.create(sinUpUser);
      return await this.tokenService.generateToken({
        sub: id,
        name: email,
        role: role,
      });
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }
}
