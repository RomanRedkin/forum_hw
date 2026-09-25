import * as productRepository from "../repositories/product.js"

export async function createPost(data){
    const {id, title, content, author, category} = data

    const allPosts = productRepository.getAllPosts()
    const isDuplicate = allPosts.find((post) => post.title === title)

    if(isDuplicate){
        return 'duplicate'
    }
    const newPost = {
        title: title,
        category: category,
        author: author,
        content: content
    }
    const result = await productRepository.addPost(newPost)
    return result
}

export function getPosts(take, category) {
    return productRepository.getAllPosts(take, category);
}

export function getPostById(id) {
    return productRepository.getPostById(id);
}