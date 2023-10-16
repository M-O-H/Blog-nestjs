interface PostRequiredProps {
  id: number;
  title: string;
  content: string;
  authorId?: number;
}

interface PostOptionalProps {
  published: boolean;
  cover: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post extends PostRequiredProps, PostOptionalProps {}

export interface PostCreateInput
  extends Omit<PostRequiredProps, 'id'>,
    Partial<PostOptionalProps> {}

export interface PostUpdateInput extends Partial<PostCreateInput> {}
