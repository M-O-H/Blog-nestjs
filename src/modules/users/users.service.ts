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

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private readonly conn: NodePgDatabase<typeof schema>,
  ) {}
  async find(searchUserDto: PaginationDto): Promise<User[]> {
    let limit: number = Number(searchUserDto.limit) || 5;
    const skip: number = Number(searchUserDto.offset - 1) * limit || 0;
    if (limit > 10) limit = 10;
    console.log(limit, skip);
    try {
      const authUsers = await this.conn.query.users.findMany({
        limit: limit,
        offset: skip,
        orderBy: users.createdAt,
      });
      if (!authUsers[0]) throw new BadRequestException();
      authUsers.map((user) => {
        delete user.password;
      });
      return authUsers;
    } catch (error) {
      throw error;
    }
  }

  async findById(userId: number): Promise<User> {
    try {
      const user = await this.conn.query.users.findFirst({
        where: eq(users.id, userId),
        with: { posts: true },
      });
      if (!user) throw new NotFoundException(`user not found`);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmailOrUsername(emailOrUsername: string): Promise<User[]> {
    try {
      const user = await this.conn.query.users.findMany({
        where: or(
          eq(users.email, emailOrUsername),
          like(users.username, `%${emailOrUsername}%`),
        ),
      });
      if (!user[0]) throw new NotFoundException(`user not found`);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOneByUsername(username: string): Promise<User[]> {
    try {
      const user = await this.conn.query.users.findMany({
        where: like(users.username, `%${username}%`),
      });
      if (!user[0]) throw new NotFoundException(`user not found`);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<User[]> {
    try {
      const user = await this.conn.query.users.findMany({
        where: eq(users.email, email),
      });
      if (!user[0]) throw new NotFoundException(`user not found`);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async create(userDto: UserCreateInput): Promise<User> {
    try {
      const [CreatedUser] = await this.conn
        .insert(users)
        .values(userDto)
        .onConflictDoNothing()
        .returning();
      if (!CreatedUser)
        throw new BadRequestException('User with Email/Username already exist');
      delete CreatedUser.password;
      return CreatedUser;
    } catch (error) {
      throw error;
    }
  }

  async updateRole(userId: number, newRole: string) {
    try {
      if (!RoleType[newRole]) throw new BadRequestException('INVALID_ROLE');
      const [updatedUser] = await this.conn
        .update(users)
        .set({
          role: RoleType[newRole],
        })
        .where(eq(users.id, userId))
        .returning();
      if (!updatedUser) throw new NotFoundException(`INVALID_USER_ID`);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}
