import { relations } from 'drizzle-orm';
import {
  pgEnum,
  pgTable,
  serial,
  text,
  date,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';

export const Role = pgEnum('role', [
  'ADMIN',
  'MANAGE_POSTS',
  'MANAGE_COMMENTS',
  'USER',
]);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').unique(),
  email: text('email').unique(),
  password: text('password'),
  role: Role('role').default('USER'),
  createdAt: date('updatedAt').defaultNow(),
  updatedAt: date('updatedAt').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title'),
  content: text('content'),
  authorId: integer('author_id'),
  published: boolean('published').default(false),
  cover: text('cover').default('../../assets/covers/sdc.png'),
  createdAt: date('createdAt').defaultNow(),
  updatedAt: date('updatedAt').defaultNow(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
