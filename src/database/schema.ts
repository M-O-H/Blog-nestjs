import { relations } from 'drizzle-orm';
import {
  pgEnum,
  pgTable,
  serial,
  text,
  integer,
  boolean,
  varchar,
  timestamp,
} from 'drizzle-orm/pg-core';

export const Role = pgEnum('role', [
  'ADMIN',
  'MANAGE_POSTS',
  'MANAGE_COMMENTS',
  'USER',
]);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).unique().notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: text('password').notNull(),
  role: Role('role').default('USER'),
  createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
}));

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 70 }).notNull(),
  content: varchar('content', { length: 250 }).notNull(),
  authorId: integer('author_id').notNull(),
  published: boolean('published').default(false),
  rate: integer('rate').default(0),
  cover: text('cover').default('../../assets/covers/sdc.png'),
  createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow(),
  tags: text('tags').default('[]'),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
}));

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  authorId: integer('authorId').notNull(),
  postId: integer('postId').notNull(),
  createdAt: timestamp('createdAt', { mode: 'string' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'string' }).defaultNow(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
}));
