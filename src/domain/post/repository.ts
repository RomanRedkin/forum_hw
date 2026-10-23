import type { Post, Category } from "./entity.js";

export interface PostRepository {
    getAll(categoryName?: string, take?: number): Promise<Post[]>;
    getById(id: number): Promise<Post | null>;
    addPost(post: Omit<Post, "id" | "category">): Promise<Post>;
    getAllCategories(): Promise<Category[]>;
    addCategory(category: Omit<Category, "id">): Promise<Category>;
}