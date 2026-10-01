import type { Post } from "../domain/post/entity.js";
import type { PostRepository } from "../domain/post/repository.js";


export function createPostRepository(): PostRepository {
    let posts: Post[] = [
        {
            id: 1,
            title: "iphone",
            content: "как пользоваться",
            author: "Roma",
            category: "electronics",
        },
        {
            id: 2,
            title: "t-shirt",
            content: "классная футболка",
            author: "Atrem",
            category: "clothing",
        },
        {
            id: 3,
            title: "android",
            content: "как пользоваться",
            author: "Roma",
            category: "electronics",
        }
    ];
    return {
        getAll(category, take) {
            let result = posts;

            if (category) {
                result = result.filter((post) => post.category === category);
            }

            if (!take) {
                return result;
            }

            result = result.slice(0, take);
            return result;
        },

        getById(id) {
            return posts.find((post) => post.id === id);
        },

        async addPost(post) {
            const newPost = {
                id: posts.length + 1,
                ...post,
            };

            posts = [...posts, newPost];
            return newPost;
        }
    }
} 
