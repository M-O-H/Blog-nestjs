import { PG_CONNECTION } from '@/common/constants/pg.constants';
import { RoleType } from '@/common/interface/role.interface';
import { User, UserCreateInput } from '@/common/interface/user.interface';
import { users } from '@/database/schema';
import * as schema from '@/database/schema';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { eq, like, or } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PaginationDto } from './dtos/pagination.dto';
import { insertUser, selecttUser } from '@/common/models/crud.model';
import { BusinessException } from '@/common/exceptions/business.exception';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private readonly conn: NodePgDatabase<typeof schema>,
  ) {}
  // ----------- Dev service ---------------- //
  async find(searchUserDto: PaginationDto): Promise<User[]> {
    let limit: number = Number(searchUserDto.limit) || 5;
    const skip: number = Number(searchUserDto.offset - 1) * limit || 0;
    if (limit > 10) limit = 10;
    console.log(limit, skip);
    try {
      const authUsers: selecttUser[] = await this.conn.query.users.findMany({
        limit: limit,
        offset: skip,
        orderBy: users.createdAt,
      });
      if (!authUsers[0]) throw new BadRequestException('Users list empty');
      authUsers.map((user) => {
        delete user.password;
      });
      return authUsers;
    } catch (error) {
      throw new BusinessException('Users', error);
    }
  }

  async findOneByEmailOrUsername(
    emailOrUsername: string,
  ): Promise<selecttUser> {
    try {
      const [user]: selecttUser[] = await this.conn.query.users.findMany({
        where: or(
          eq(users.email, emailOrUsername),
          like(users.username, `%${emailOrUsername}%`),
        ),
      });
      if (!user) throw new NotFoundException(`user not found`);
      return user;
    } catch (error) {
      throw new BusinessException('Users', error);
    }
  }

  async findOneByUsername(username: string): Promise<any> {
    try {
      const user: selecttUser[] = await this.conn.query.users.findMany({
        where: like(users.username, `%${username}%`),
      });
      if (!user[0]) throw new NotFoundException(`user not found`);
      return user;
    } catch (error) {
      throw new BusinessException('Users', error);
    }
  }

  async findOneByEmail(email: string): Promise<User[]> {
    try {
      const user: selecttUser[] = await this.conn.query.users.findMany({
        where: eq(users.email, email),
      });
      if (!user[0]) throw new NotFoundException(`user not found`);
      return user;
    } catch (error) {
      throw new BusinessException('Users', error);
    }
  }

  // ----------- Private  Services ---------------- //
  async updateRole(userId: number, updatedRole: string) {
    try {
      if (!RoleType[updatedRole]) throw new BadRequestException('INVALID_ROLE');
      const [updatedUser] = await this.conn
        .update(users)
        .set({
          role: RoleType[updatedRole],
        })
        .where(eq(users.id, userId))
        .returning();
      if (!updatedUser) throw new NotFoundException(`INVALID_USER_ID`);
      return updatedUser;
    } catch (error) {
      throw new BusinessException('Users', error);
    }
  }

  // ----------- Dev  Methods ---------------- //
  async findById(userId: number): Promise<User> {
    try {
      const user: selecttUser = await this.conn.query.users.findFirst({
        where: eq(users.id, userId),
        with: {
          comments: true,
        },
      });
      if (!user) throw new NotFoundException(`user not found`);
      delete user.password;
      return user;
    } catch (error) {
      throw new BusinessException('Users', error, userId);
    }
  }

  async create(userDto: UserCreateInput): Promise<User> {
    try {
      const [CreatedUser]: insertUser[] = await this.conn
        .insert(users)
        .values(userDto)
        .onConflictDoNothing()
        .returning();
      if (!CreatedUser)
        throw new BadRequestException('User with Email/Username already exist');
      delete CreatedUser.password;
      return CreatedUser;
    } catch (error) {
      throw new BusinessException('Users', error);
    }
  }
}
