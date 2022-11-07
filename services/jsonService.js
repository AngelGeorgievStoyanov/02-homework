const apiJson = 'http://localhost:3000'

export async function addToFavorites(id, title, author) {
    let response = await fetch(`${apiJson}/posts`, {
        method: 'POST',
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ id, title, author })
    });

    let result = await response.json()
    return result;

}


export async function getAllFavorites() {

    const data = await fetch(`${apiJson}/posts`)
    return data.json()
}

