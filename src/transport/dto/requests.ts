export interface PostRequest {
  title: string;
  content: string;
  author: string;
  categoryId: number;
}

export interface CategoryRequest {
  name: string;
}

export interface EmptyParams {}
export interface EmptyResponse {}