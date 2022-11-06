const URL_API_BOOKS = 'https://www.googleapis.com/books/v1/volumes?q=';
const query = document.getElementById('search');
const max = '&maxResults=40';
const btnSearch = document.getElementById('searchFunc');
const btnMyFav = document.getElementById('myFav')
btnMyFav.style.display = 'none';
const div = document.getElementById('result');

let arr = [];
let bookDetails;

btnSearch.addEventListener('click', (e) => { if (query.value.trim() != '') { init(URL_API_BOOKS, max, query.value.trim(), e) } });



import { getAllBoks } from '../services/bookService.js'
import { home } from './home.js';



async function init(url, max, data, e) {
    e.preventDefault();
    let a = div.childNodes;
    if (a.length > 0) {
        let arrNode = Array.from(a);
        for (const el of arrNode) {
            el.remove();
        }

    }

    const currentUrl = url +data+ max
    console.log(currentUrl)
    const books = await getAllBoks(currentUrl)
   
    arr = Array.from(books.items)
    console.log(arr)

    home(arr, div);
}

