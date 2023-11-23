import { PG_CONNECTION } from '@/common/constants/pg.constants';
import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/database/schema';
import { users } from '@/database/schema';
import { eq, like, or } from 'drizzle-orm';
import {
  UpdateUserRole,
  User,
  UserCreateInput,
} from '@/common/interface/user.interface';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject(PG_CONNECTION) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(user: UserCreateInput) {
    return this.db.insert(users).values(user).onConflictDoNothing().returning();
  }

  async find(page: number, limit: number): Promise<User[]> {
    return this.db.query.users.findMany({
      limit: limit,
      offset: (page - 1) * limit,
      orderBy: users.id,
    });
  }

  async findById(userId: number): Promise<any> {
    await this.db.query.users.findFirst({
      where: eq(users.id, userId),
    });
  }

  async findOneByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User> {
    return this.db.query.users.findFirst({
      where: or(eq(users.email, email), eq(users.username, username)),
    });
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.db.query.users.findFirst({
      where: like(users.username, `%${username}%`),
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async updateRole(userId: number, entity: UpdateUserRole) {
    return this.db.update(users).set(entity).where(eq(users.id, userId));
  }

  async deleteOneById(userId: number): Promise<User[]> {
    return this.db.delete(users).where(eq(users.id, userId)).returning();
  }
}
