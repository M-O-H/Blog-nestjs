import { User } from '@/common/interface/user.interface';
import { UsersService } from '@/modules/users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validationUser(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findOneByEmailOrUsername(username);
    if (user && user.password == password) {
      delete user.password;
      return user;
    }
    return null;
  }

  login(user: User) {
    const payload = { name: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async authUser(userId: number) {
    const user = await this.userService.findById(userId);
    delete user.id;
    return user;
  }
}
