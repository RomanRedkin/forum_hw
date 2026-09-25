let posts = []

export function getAllPosts(take, category){
    let result = [...posts]
    if(category) {
        result = result.filter(post => post.category === category)
    }
    if(take) {
        result = result.slice(0, take)
    }
    return result
}

export function getPostById(id){
    const post = posts.find((post) => post.id === id)
    return post
}

export async function addPost(newPost, fail){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(fail === "true") {
                reject()
            } else {
                posts = [...posts, newPost]
                resolve(newPost)
            }
        }) 
            
    })
}