import { getAllFavorites } from '../services/jsonService.js';
import { elem } from './createElem.js'

const query = document.getElementById('search');


export async function home(arrBook, div) {

    const idBooki = await getAllFavorites();

    if (idBooki.length > 1) {
        const btnMyFav = document.getElementById('myFav');
        btnMyFav.style.display = 'block';

    }
  
    query.value = '';
    arrBook.forEach(e => {
        let idBook = e.id;

        const hasFavorit = idBooki.some((x) => x.id == idBook);

        let section = elem('section', 'home-section', false, false, false, false, idBook);

        let h3 = elem('h3');

        let text = e.volumeInfo.title;
        if (text.length > 45) {

            h3.textContent = text.substring(0, 45) + '...';

        } else {

            h3.textContent = text;

        }
        let src = e.volumeInfo.imageLinks.smallThumbnail;
        let img = elem('img', false, false, 128, 158, src);
        let buttonFavorits = elem('button', 'btnFav', 'Favorits', false, false, false);
        let buttonRemove = elem('button', 'btnRmv', 'Remove', false, false, false);
        let buttonDtls = elem('button', 'btnDtls', 'Details', false, false, false);


        section.appendChild( h3);
        section.appendChild(img);
        if (hasFavorit) {
            section.appendChild(buttonRemove);
        } else {
            section.appendChild(buttonFavorits);

        }
        section.appendChild(buttonDtls);

        div.appendChild(section);

    });

}