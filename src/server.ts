import express from "express";
import { createPostRepository } from "./repositories/post.js";
import { createPostService } from "./services/post.js";
import { createPostHandlers } from "./transport/dto/post/handlers/post.js";
import { createPostRouter } from "./transport/dto/post/routers/post.js";

const app = express();
app.use(express.json());

const HOST = "localhost";
const PORT = 3000;

const postRepository = createPostRepository();
const postService = createPostService(postRepository);
const postHandlers = createPostHandlers(postService);
const postRouter = createPostRouter(postHandlers);

app.use(postRouter);

app.listen(PORT, HOST, () => {
  console.log(`http://${HOST}:${PORT}`);
});