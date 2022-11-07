
const query = document.getElementById('search');
const btnSearch = document.getElementById('searchFunc');
const btnMyFav = document.getElementById('myFav')
btnMyFav.style.display = 'none';
btnMyFav.addEventListener('click', (e) => myFavorites(e));
const div = document.getElementById('result');
div.addEventListener('click', (e) => checkEventTarget(e));
btnSearch.addEventListener('click', (e) => { if (query.value.trim() != '') { init(query.value.trim(), e) } });

let divCildren = div.childNodes;

let arr = [];
let bookDetails;




import { getAllBoks, getBookById } from '../services/bookService.js'
import { clearDiv } from './clearDiv.js';
import { detailsPage } from './detailsBook.js';
import { home } from './home.js';
import { addToFavorites, getAllFavorites } from '../services/jsonService.js'
import { favorites } from './myFavorites.js';



async function init(data, e) {
    e.preventDefault();

    if (divCildren.length > 0) {
        clearDiv(divCildren)

    }


    const books = await getAllBoks(data)

    arr = Array.from(books.items)


    home(arr, div);
}


async function checkEventTarget(e) {
    e.preventDefault()
    const id = e.target.parentNode.id;

    if (e.target.className == 'btnDtls') {

        if (divCildren.length > 0) {
            clearDiv(divCildren)
        }

        const book = await getBookById(id)

        detailsPage(book, div)

    } else if (e.target.className == 'btnBack') {
        clearDiv(divCildren)
        home(arr, div);

    } else if (e.target.className == 'btnFav') {
        btnMyFav.style.display = 'block';
        const book = await getBookById(id)
        let title = book.volumeInfo.title
        let author = book.volumeInfo.authors

        if (author == undefined) {
            author = 'For this book missing author in db'
        }


        addToFavorites(id, title, author)
        e.target.textContent = 'Remove';
        e.target.className = 'btnRmv';

    }

}


async function myFavorites(e) {
    e.preventDefault()

    const booksFav = await getAllFavorites()

    console.log(11111, booksFav)
    let arrFavorites = []

    if (divCildren.length > 0 && divCildren != undefined) {
        clearDiv(divCildren)
    }


    booksFav.forEach(async e => {
        const book = favorites(e.id)
        arrFavorites.push(book)
    });

    const arrf = await Promise.all(arrFavorites).then((values) => {
        return values;
    });


    console.log(arrf.slice(1), 22222222222)




    home(arrf.slice(1), div)


}

