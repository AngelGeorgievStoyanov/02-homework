import { elem } from './createElem.js'


export function detailsPage(bookObj,div) {
    let idBook = bookObj.id;

    let article = elem('article', false, false, false, false, false, idBook);

    let h1 = elem('h1');
    h1.textContent = 'Title  of the Book  --- ' + bookObj.volumeInfo.title;

    let h2 = elem('h2');
    h2.textContent = bookObj.volumeInfo.authors != undefined ? 'Authors of the Book  ---  ' + bookObj.volumeInfo.authors.join('  and  ') : 'There is no author for this book in DB';

    let h3 = elem('h3');
    let date = bookObj.volumeInfo.publishedDate
    if (date != undefined) {

        date = 'Published date  ---  ' + date.split('-').reverse().join('/');

    } else {

        date = 'No info for published date';
    }

    h3.textContent = date;

    let p = elem('p');
    p.innerHTML = bookObj.volumeInfo.description != undefined ? 'Description  ' + bookObj.volumeInfo.description : 'Тhere is no description for this book in DB';

    let src = bookObj.volumeInfo.imageLinks.thumbnail;
    let img = elem('img', false, false, false, false, src);

    let btnBack = elem('button', 'btnBack', 'BACK');


    article.appendChild(h1);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(img);
    article.appendChild(p);
    article.appendChild(btnBack);

    div.appendChild(article);
}