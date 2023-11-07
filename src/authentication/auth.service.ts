import { User } from '@/common/interface/user.interface';
import { UsersService } from '@/modules/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

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
}
