interface RequiredProps {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

interface OptionalProps {
  published: boolean;
  cover: string;
  createdAt: string;
  updatedAt: string;
}

export interface Post extends RequiredProps, OptionalProps {}

export interface PostCreateInput
  extends Omit<RequiredProps, 'id'>,
    Partial<OptionalProps> {}

export interface PostUpdateInput extends Partial<PostCreateInput> {}
