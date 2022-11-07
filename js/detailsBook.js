import { getAllFavorites } from '../services/jsonService.js';
import { addCommentForm } from './addComments.js';
import { elem } from './createElem.js'


export async function detailsPage(bookObj, div, addCmt) {


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
    p.innerHTML = bookObj.volumeInfo.description != undefined ? 'Description  ' + bookObj.volumeInfo.description : 'There is no description for this book in DB';

    let src = bookObj.volumeInfo.imageLinks.thumbnail;
    let img = elem('img', false, false, false, false, src);
    let section = elem('section', 'sectionButtons')
    let btnBackHome = elem('button', 'btnBackToHome', 'BACK TO HOME');
    let btnBackFav = elem('button', 'btnBackToFav', 'BACK TO FAVORITES');
    let btnComment = elem('button', 'btnCmnt', 'Add coment')

    const hasFav = await getAllFavorites()
    const hasFavorit = hasFav.filter((x) => x.id == idBook);

    article.appendChild(h1);
    article.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(img);
    article.appendChild(p);
    section.appendChild(btnBackHome);

    if (hasFav.length > 1) {

        section.appendChild(btnBackFav);
    }

    if (hasFavorit.length > 0) {
        section.appendChild(btnComment)
    }


    article.appendChild(section);
    
    
    let divForm = elem('div')
  
    
    
    const form = await addCommentForm()
    
    divForm.append(form)
    article.appendChild(divForm);
    div.appendChild(article);
}