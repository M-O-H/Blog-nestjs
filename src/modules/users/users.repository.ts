import { PG_CONNECTION } from '@/common/constants/pg.constants';
import { Injectable, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/database/schema';
import { users, Role } from '@/database/schema';
import { eq, like, or } from 'drizzle-orm';
import { User, UserCreateInput } from '@/common/interface/user.interface';
import { Role as RoleInterface } from '@/common/interface/role.interface';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject(PG_CONNECTION) private readonly db: NodePgDatabase<typeof schema>,
  ) { }

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
    return await this.db.query.users.findFirst({
      where: eq(users.id, userId),
      with: { posts: true },
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
      with: { posts: true },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async update(userId: number, entity: any) {
    return this.db
      .update(users)
      .set({
        [users.role.name]: Role[entity],
      })
      .where(eq(users.id, userId))
      .returning();
  }

  async deleteOneById(userId: number): Promise<User[]> {
    return this.db.delete(users).where(eq(users.id, userId)).returning();
  }
}
