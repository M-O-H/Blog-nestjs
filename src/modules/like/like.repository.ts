import { PG_CONNECTION } from '@/common/constants/pg.constants';
import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/database/schema';
import { likes } from '@/database/schema';
import { and, eq } from 'drizzle-orm';
import { LikableType } from '@/common/interface/like.interface';

Injectable();
export class LikeRepository {
  constructor(
    @Inject(PG_CONNECTION) private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async createLike(
    userId: number,
    likableId: number,
    likableType: LikableType,
  ) {
    return this.db
      .insert(likes)
      .values({
        userId,
        likableId,
        likableType,
      })
      .onConflictDoNothing()
      .returning();
  }

  async removeLike(
    userId: number,
    likableId: number,
  ): Promise<any | undefined> {
    return await this.db
      .delete(likes)
      .where(and(eq(likes.userId, userId), eq(likes.likableId, likableId)))
      .returning();
  }
}
