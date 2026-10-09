import express from "express";
import type { PostHandlers } from "../handlers/post.js";

export function createPostRouter(handlers: PostHandlers) {
    const router = express.Router();

    router.get("/posts", handlers.getPostsHandler);
    router.get("/posts/:id", handlers.getPostByIdHandler);
    router.post("/posts", handlers.createPostHandler);

    return router;
}


