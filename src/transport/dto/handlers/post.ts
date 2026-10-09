import type { Request, Response } from "express";
import type { PostService } from "../../../services/repository.js";
import type { PostResponse } from "../responses.js";
import type { ErrorResponse } from "../errors.js";
import type { PostRequest } from "../requests.js";



export interface PostHandlers {
    getPostsHandler(req: Request, res: Response<PostResponse[] | ErrorResponse>): void;
    getPostByIdHandler(req: Request, res: Response<PostResponse | ErrorResponse>): void;
    createPostHandler(
        req: Request<Record<string, any>, any, PostRequest>, 
        res: Response<PostResponse | ErrorResponse>
    ): Promise<void>;
}

export function createPostHandlers(postService: PostService): PostHandlers {
    return {
        getPostsHandler(req: Request, res: Response<PostResponse[] | ErrorResponse>) {
            const { category, take } = req.query;
            let numberTake: number | undefined;

            if (take !== undefined) {
                numberTake = Number(take);

                if (!Number.isInteger(numberTake) || numberTake <= 0) {
                res.status(400).json({
                    message: "Invalid take",
                });
                return;
                }
            }

            const posts = postService.getPosts(category as string | undefined, numberTake);
            res.status(200).json(posts);
        },

        getPostByIdHandler(req: Request, res: Response<PostResponse | ErrorResponse>) {
            const id = Number(req.params.id);

            if (!Number.isInteger(id)) {
                res.status(400).json({
                message: "Invalid id",
                });
                return;
            }

            const post = postService.getPostById(id);

            if (!post) {
                res.status(404).json({
                message: "Post not found",
                });
                return;
            }

            res.status(200).json(post);
        },

        async createPostHandler(
            req: Request<Record<string, any>, any, PostRequest>, 
            res: Response<PostResponse | ErrorResponse>
        ) {
            const { title, content, author, category } = req.body;

            if (
                typeof title !== "string" || !title.trim() ||
                typeof content !== "string" || !content.trim() ||
                typeof author !== "string" || !author.trim() ||
                typeof category !== "string" || !category.trim()
            ) {
                res.status(400).json({
                message: "Invalid post data",
                });
                return;
            }

            const newPost = {
                title: title.trim(),
                content: content.trim(),
                author: author.trim(),
                category: category.trim(),
            };

            const post = await postService.createPost(newPost);
            res.status(201).json(post);
        }
    };
}