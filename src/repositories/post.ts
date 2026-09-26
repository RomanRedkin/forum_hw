let posts = [
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

export function getAll(category, take) {
  let result = posts;

  if (category) {
    result = result.filter(
      (post) => post.category === category
    );
  }

  if (!take) {
    return result;
  }

  result = result.slice(0, take);
  return result;
}

export function getById(id) {
  return posts.find((post) => post.id === id);
}

export async function addPost(post) {
  return new Promise((resolve) => {
    const newPost = {
      id: posts.length + 1,
      ...post,
    };

    posts = [...posts, newPost];
    resolve(newPost);
  });
}