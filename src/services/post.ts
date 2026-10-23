import type { PostRepository } from "../domain/post/repository.js";
import type { PostService } from "./post.types.js";

export function createPostService(postRepository: PostRepository): PostService {
  return {
    async getPosts(categoryName, take) {
      return await postRepository.getAll(categoryName, take);
    },
    async getPostById(id) {
      return await postRepository.getById(id);
    },
    async createPost(post) {
      return await postRepository.addPost(post);
    },
    async getCategories() {
      return await postRepository.getAllCategories();
    },
    async createCategory(category) {
      return await postRepository.addCategory(category);
    },
  };
}