const URL_API_BOOKS = 'https://www.googleapis.com/books/v1/volumes?q=';
const max = '&maxResults=40';

const urlBook = 'https://www.googleapis.com/books/v1/volumes/';

export async function getAllBoks(query) {
    const currentUrl = URL_API_BOOKS + query + max

    const data = await fetch(currentUrl)
    return await data.json()

}


export async function getBookById( id) {

    const book = await fetch(urlBook + id)

    return book.json()
}