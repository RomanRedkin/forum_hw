import type { Request, Response } from "express";
import type { PostService } from "../../../services/post.types.js";
import type { Post, Category } from "../../../domain/post/entity.js";
import type { PostRequest, CategoryRequest, EmptyParams, EmptyResponse } from "../requests.js";
import type { PostResponse } from "../responses.js";
import type { ErrorResponse } from "../errors.js";

export interface PostHandlers {
  getPostsHandler(req: Request, res: Response<PostResponse[] | ErrorResponse>): Promise<void>;
  getPostByIdHandler(req: Request, res: Response<PostResponse | ErrorResponse>): Promise<void>;
  createPostHandler(req: Request<EmptyParams, EmptyResponse, PostRequest>, res: Response<PostResponse | ErrorResponse>): Promise<void>;
  getCategoriesHandler(req: Request, res: Response<Category[] | ErrorResponse>): Promise<void>;
  createCategoryHandler(req: Request<EmptyParams, EmptyResponse, CategoryRequest>, res: Response<Category | ErrorResponse>): Promise<void>;
}

export function createPostHandlers(postService: PostService): PostHandlers {
  return {
    async getPostsHandler(req, res) {
      const { category, take } = req.query;
      
      let numberTake: number | undefined = undefined;
      if (take !== undefined) {
        numberTake = Number(take);
        if (Number.isNaN(numberTake) || !Number.isInteger(numberTake) || numberTake <= 0) {
          res.status(400).json({ message: "Invalid take" });
          return;
        }
      }

      const posts = await postService.getPosts(typeof category === "string" ? category : undefined, numberTake);
      
      // Маппим полученные посты к твоему PostResponse, превращая объект в строку names
      const response: PostResponse[] = posts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category?.name ?? ""
      }));

      res.status(200).json(response);
    },

    async getPostByIdHandler(req, res) {
      const id = Number(req.params.id);
      if (Number.isNaN(id) || !Number.isInteger(id)) {
        res.status(400).json({ message: "Invalid id" });
        return;
      }

      const post = await postService.getPostById(id);
      if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      // Маппим к твоей структуре со строковой категорией
      const response: PostResponse = {
        id: post.id,
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category?.name ?? ""
      };

      res.status(200).json(response);
    },

    async createPostHandler(req, res) {
      const { title, content, author, categoryId } = req.body;

      if (!title?.trim() || !content?.trim() || !author?.trim() || typeof categoryId !== "number") {
        res.status(422).json({ message: "Invalid post data" });
        return;
      }

      try {
        const post = await postService.createPost({
          title: title.trim(),
          content: content.trim(),
          author: author.trim(),
          categoryId,
        });

        const response: PostResponse = {
          id: post.id,
          title: post.title,
          content: post.content,
          author: post.author,
          category: post.category?.name ?? ""
        };

        res.status(201).json(response);
      } catch (error) {
        if (error instanceof Error && error.message === "CATEGORY_NOT_FOUND") {
          res.status(404).json({ message: "Category not found" });
          return;
        }
        res.status(500).json({ message: "Internal server error" });
      }
    },

    async getCategoriesHandler(req, res) {
      const categories = await postService.getCategories();
      res.status(200).json(categories);
    },

    async createCategoryHandler(req, res) {
      const { name } = req.body;

      if (!name?.trim()) {
        res.status(422).json({ message: "Invalid category data" });
        return;
      }

      try {
        const category = await postService.createCategory({ name: name.trim() });
        res.status(201).json(category);
      } catch (error) {
        if (error instanceof Error && error.message === "CATEGORY_ALREADY_EXISTS") {
          res.status(409).json({ message: "Category already exists" });
          return;
        }
        res.status(500).json({ message: "Internal server error" });
      }
    },
  };
}