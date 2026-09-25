import {Router} from "express"
import * as productHandler from "../handlers/product.js";

const router = Router();

router.post("/",productHandler.createPost);
router.get("/", productHandler.getPosts);
router.get("/:id", productHandler.getPostById);

export default router