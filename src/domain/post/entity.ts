export interface Category {
    id: number;
    name: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    categoryId: number;
    category?: Category;
}