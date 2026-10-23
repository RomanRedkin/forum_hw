import type { PostgresClient } from "@prisma/orm-postgres/runtime";
import type { Post, Category } from "../domain/post/entity.js";
import type { Contract } from "../prisma/contract.d.js";



const formatPostResponse = (postItem: any): Post => {
    return {
        id: postItem.id,
        title: postItem.title,
        content: postItem.content,
        author: postItem.author,
        categoryId: postItem.categoryId,
        ...(postItem.category && {
            category: {
                id: postItem.category.id,
                name: postItem.category.name,
            },
        }),
    };
};
// Не работает с PostgresClient<Contract>
export function createPostRepository(db: any) {
    return {
        async getAll(categoryName?: string, take?: number): Promise<Post[]> {
            if (categoryName) {
                const categoryWithPosts = await db.orm.Category.findUnique({
                    where: { name: categoryName },
                    include: {
                        posts: {
                            take,
                            include: { category: true },
                        },
                    },
                });

                return (categoryWithPosts?.posts || []).map((postItem: any) => formatPostResponse(postItem));
            }

            const allPosts = await db.orm.Post.findMany({
                take,
                include: { category: true },
            });

            return allPosts.map((postItem: any) => formatPostResponse(postItem));
        },

        async getById(id: number): Promise<Post | null> {
            const foundPost = await db.orm.Post.findUnique({
                where: { id },
                include: { category: true },
            });

            return foundPost ? formatPostResponse(foundPost) : null;
        },

        async addPost(post: Omit<Post, "id" | "category">): Promise<Post> {
            try {
                const createdPost = await db.orm.Post.create({
                    data: post,
                    include: { category: true },
                });

                return formatPostResponse(createdPost);
            } catch (error: any) {
                if (["P2003", "P2025"].includes(error?.code)) {
                    throw new Error("CATEGORY_NOT_FOUND");
                }
                throw error;
            }
        },

        async getAllCategories(): Promise<Category[]> {
            const allCategories = await db.orm.Category.findMany({
                select: {
                    id: true,
                    name: true,
                },
            });

            return allCategories.map((categoryItem: any) => ({
                id: categoryItem.id,
                name: categoryItem.name,
            }));
        },

        async addCategory(category: Omit<Category, "id">): Promise<Category> {
            try {
                const createdCategory = await db.orm.Category.create({
                    data: category,
                });

                return {
                    id: createdCategory.id,
                    name: createdCategory.name,
                };
            } catch (error: any) {
                if (error?.code === "P2002") {
                    throw new Error("CATEGORY_ALREADY_EXISTS");
                }
                throw error;
            }
        },
    };
}