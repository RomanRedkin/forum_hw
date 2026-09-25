import * as productService from "../services/product.js";

export async function createPost(req, res) {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(422).json({
            message: "Title and content are required"
        })
    }
    const result = await productService.createPost(req.body);
    if (result === "duplicate") {
        return res.status(409).json({
            message: "Name conflict"
        })
    }
    return res.status(201).json(result);
}

export function getPosts(req, res) {
    const { take, category } = req.query;
    const result = productService.getPosts(take, category)
    return res.status(200).json(result)
}

export function getPostById(req, res) {
    const { id } = req.params;
    const result = productService.getPostById(id)
    if (!result) {
        return res.status(404).json({
            message: "Post not found"
        })
    }
    return res.status(200).json(result);
}