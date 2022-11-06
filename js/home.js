import { elem } from './createElem.js'

const query = document.getElementById('search');


export function home(arrBook, div) {
    query.value = '';
    arrBook.forEach(e => {
        let idBook = e.id;

        //  const hasFavorit = bookFavId.some((x) => x == idBook)


        let section = elem('section', false, false, false, false, false, idBook);

        let h3 = elem('h3');

        let text = e.volumeInfo.title;
        if (text.length > 45) {

            h3.textContent = text.substring(0, 45) + '...'

        } else {

            h3.textContent = text;

        }
        let src = e.volumeInfo.imageLinks.smallThumbnail;
        let img = elem('img', false, false, 128, 158, src);

        let buttonDtls = elem('button', 'btnDtls', 'Details', false, false, false);
        //  let buttonFavorits
        // if (hasFavorit) {
        //      buttonFavorits = elem('button', 'btnRmv', 'Remove', false, false, false);
        //  } else {
        //      buttonFavorits = elem('button', 'btnFav', 'Favorits', false, false, false);
        // }



        section.appendChild(h3);
        section.appendChild(img);
        section.appendChild(buttonDtls);
        //  section.appendChild(buttonFavorits);

        div.appendChild(section);

    });

}