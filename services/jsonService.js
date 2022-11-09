const apiJson = 'http://localhost:3000'

export async function addToFavorites(id, title, author) {
    let response = await fetch(`${apiJson}/posts`, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ id, title, author ,"comments":[]})
    });

    let result = await response.json()
    return result;

}


export async function getAllFavorites() {

    const data = await fetch(`${apiJson}/posts`)
    return data.json()
}



export async function deleteFavoritesId(id){
    
    let response = await fetch(`${apiJson}/posts/${id}`, {
        method: 'DELETE',
       
    });

    return  response;
}


export async function createComment(id,body){
    let post = await fetch(`${apiJson}/posts/${id}`, {
        method: 'PUT',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    });

    let result = await post.json()
    return result;

}

export async function getPostById(id){
    let response = await fetch(`${apiJson}/posts/${id}`)

    let result = await response.json()
    return result;
}

export async function editAndDeleteComment(id,body){
    let post = await fetch(`${apiJson}/posts/${id}`, {
        method: 'PUT',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    });

    let result = await post.json()
    return result;

}