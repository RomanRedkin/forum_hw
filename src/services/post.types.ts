import type { Post, Category } from "../domain/post/entity.js";

export interface PostService {
  getPosts(categoryName?: string, take?: number): Promise<Post[]>;
  getPostById(id: number): Promise<Post | null>;
  createPost(post: Omit<Post, "id" | "category">): Promise<Post>;
  getCategories(): Promise<Category[]>;
  createCategory(category: Omit<Category, "id">): Promise<Category>;
}