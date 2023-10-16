import { posts } from '@/database/schema';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type insertPost = InferInsertModel<typeof posts>;

export type selectPost = InferSelectModel<typeof posts>;
