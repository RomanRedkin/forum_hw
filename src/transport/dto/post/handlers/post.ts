import type { Request, Response } from "express";
import {getPosts, getPostById, createPost} from "../../../../services/post.js";
import type { PostResponse } from "../responses.js";
import type { ErrorResponse } from "../errors.js";
import type { PostRequest } from "../requests.js";

export function getPostsHandler(req: Request, res: Response<PostResponse[] | ErrorResponse>) {
    const { category, take } = req.query;
    let numberTake;

    if (take !== undefined) {
        numberTake = Number(take);

        if (!Number.isInteger(numberTake) || numberTake <= 0) {
            return res.status(400).json({
                message: "Invalid take",
            });
        }
    }

    const posts = getPosts(category, numberTake);

    res.status(200).json(posts);
}

export function getPostByIdHandler(req: Request, res: Response) {
    const id = Number(req.params.id);
    const post = getPostById(id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            message: "Invalid id",
        });
    }

    if (!post) {
        return res.status(404).json({
            message: "Post not found",
        });
    }

    res.status(200).json(post);
}

export async function createPostHandler(req: Request<{}, {}, PostRequest>, res: Response) {

    const { title, content, author, category } = req.body;

    if (typeof title !== "string" || !title.trim() || typeof content !== "string" || !content.trim() || typeof author !== "string" || !author.trim() || typeof category !== "string" || !category.trim()) {
        return res.status(422).json({
            message: "Invalid post data",
        });
    }

    const newPost = {
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        category: category.trim(),
    };

    const post = await createPost(newPost);
    res.status(201).json(post);
}