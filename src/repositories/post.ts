import type { Post } from "../domain/post/entity.js";
import type { PostRepository } from "../domain/post/repository.js";
import { db } from "../prisma/db.js";


export function createPostRepository(database: any): PostRepository {
    return {
        getAll(category, take) {
            let query = database.orm.public.Post
            if (category !== undefined) {
                query = query.where({ category })
            }
            if (take !== undefined) {
                query = query.limit(take)
            }
            return query.all() as unknown as Post[]
        },

        getById(id) {
            const post = database.orm.public.Post.where({ id }).first()
            return post as unknown as Post | undefined
        },

        async addPost(post) {
            const newPost = await database.orm.public.Post.create({
                title: post.title,
                content: post.content,
                author: post.author,
                category: post.category,
            })
            return newPost as unknown as Post
        }
    }
} 
