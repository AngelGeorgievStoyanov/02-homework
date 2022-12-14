
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
import {
    addToFavorites, getAllFavorites,
    deleteFavoritesId, getPostById,
    createComment, editAndDeleteComment
} from '../services/jsonService.js';

import { favorites } from './myFavorites.js';
import { editForm } from './editForm.js';

const idBooki = await getAllFavorites();

if (idBooki.length > 1) {
    const btnMyFav = document.getElementById('myFav');
    btnMyFav.style.display = 'block';

}

async function init(data, e) {
    e.preventDefault();



    if (divCildren.length > 0) {
        clearDiv(divCildren);

    }


    const books = await getAllBoks(data);

    arr = Array.from(books.items);


    home(arr, div);
}


async function checkEventTarget(e) {
    e.preventDefault();
    const id = e.target.parentNode.id;

    if (e.target.className == 'btnDtls') {

        if (divCildren.length > 0) {
            clearDiv(divCildren);
        }

        const book = await getBookById(id);
        const postComm = await getPostById(id);

        detailsPage(book, div, postComm.comments);

    } else if (e.target.className == 'btnBackToHome') {
        clearDiv(divCildren);
        home(arr, div);

    } else if (e.target.className == 'btnFav') {
        btnMyFav.style.display = 'block';
        const book = await getBookById(id);
        let title = book.volumeInfo.title;
        let author = book.volumeInfo.authors;

        if (author == undefined) {
            author = 'For this book missing author in db';
        }


        addToFavorites(id, title, author);
        e.target.textContent = 'Remove';
        e.target.className = 'btnRmv';

    } else if (e.target.className == 'btnBackToFav') {
        clearDiv(divCildren);
        myFavorites(e);

    } else if (e.target.className == 'btnRmv') {

        await deleteFavoritesId(id);

        const books = await getAllFavorites();

        books.length <= 1 ? btnMyFav.style.display = 'none' : btnMyFav.style.display = 'block';
        e.target.textContent = 'Favorits';
        e.target.className = 'btnFav';

    } else if (e.target.className == 'btnCmnt') {
        const form = e.target.parentNode.parentNode.childNodes[6].childNodes[0];
        form.style.display = '';

    } else if (e.target.className == 'btnComent') {

        const id = e.currentTarget.children[0].id;
        const book = await getBookById(id);
        const postFavorits = await getPostById(id);
        const form = e.target.parentNode;

        const title = form.childNodes[1].value.trim()
        title.length > 40 ? title.substring(0, 40) : title;

        const descr = form.childNodes[3].value.trim();
        descr.length > 256 ? descr.substring(0, 256) : descr;

        const timeCreated = new Date().toJSON().split('.')[0];
        let [timeData, timeH] = timeCreated.split('T');
        timeData = timeData.split('-').reverse().join('-');
        const currentDataCreated = timeH + '/' + timeData;


        if (title != '' && descr != '') {
            const post = await getPostById(id);
            const idComment = Math.random().toString(16).slice(2);
            const comment = {
                "id": idComment,
                "title": title,
                "description": descr,
                "timeCreated": currentDataCreated,
                "timeEdited": false

            }

            postFavorits.comments.push(comment);

            let comments = await createComment(id, postFavorits);

            form.style.display = 'none';

            if (divCildren.length > 0) {
                clearDiv(divCildren);
            }

            detailsPage(book, div, comments.comments);

        }
    } else if (e.target.className == 'delComment' || e.target.className == 'editComment') {

        const idCmt = e.target.parentNode.parentNode.id;
        const id = e.currentTarget.children[0].id;
        const book = await getBookById(id);
        const postFavorits = await getPostById(id);
        if (e.target.className == 'delComment') {
            const arr = postFavorits.comments.filter((x) => x.id != idCmt);
            postFavorits.comments = arr;
            let comments = await editAndDeleteComment(id, postFavorits);

            if (divCildren.length > 0) {
                clearDiv(divCildren);
            }

            detailsPage(book, div, comments.comments);


        }
        if (e.target.className == 'editComment') {
            const comment = postFavorits.comments.filter((x) => x.id == idCmt);
            const divCard = e.target.parentNode.parentNode;
            let form = await editForm(comment);

            clearDiv(divCard.childNodes);
            divCard.appendChild(form);
        }


    } else if (e.target.className == 'editingComment') {
        const id = e.currentTarget.children[0].id;
        const book = await getBookById(id);
        const postFavorits = await getPostById(id);
        const form = e.target.parentNode;

        const title = form.childNodes[1].value.trim()
        title.length > 40 ? title.substring(0, 40) : title;

        const descr = form.childNodes[3].value.trim();
        descr.length > 256 ? descr.substring(0, 256) : descr;

        const timeCreated = new Date().toJSON().split('.')[0];
        let [timeData, timeH] = timeCreated.split('T')
        timeData = timeData.split('-').reverse().join('-')
        const currentDataCreatedEdited = timeH + '/' + timeData;

        if (title != '' && descr != '') {
            const post = await getPostById(id);
            const idComment = form.parentNode.id;

            const comment = {
                "id": idComment,
                "title": title,
                "description": descr,
                "timeCreated": postFavorits.comments[0].timeCreated,
                "timeEdited": currentDataCreatedEdited

            }

            let arr = postFavorits.comments.filter((x) => x.id != idComment);
            postFavorits.comments = arr;
            arr.push(comment);
            let comments = await editAndDeleteComment(id, postFavorits);

            if (divCildren.length > 0) {
                clearDiv(divCildren);
            }

            detailsPage(book, div, comments.comments);

        }


    }


}


async function myFavorites(e) {
    e.preventDefault();

    const booksFav = await getAllFavorites();

    let arrFavorites = [];

    if (divCildren.length > 0 && divCildren != undefined) {
        clearDiv(divCildren);
    }


    booksFav.forEach(async e => {
        const book = favorites(e.id);
        arrFavorites.push(book);
    });

    const arrf = await Promise.all(arrFavorites).then((values) => {
        return values;
    });
   

    // TODO: When the default post in JSON Server is not deleted, I use slice(1)
    home(arrf.slice(1), div);

}

