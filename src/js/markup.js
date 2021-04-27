import movieCardTemplate from '../templates/movie-card.hbs';
import {
  addToFavHandler,
  isFilmInFavourites,
} from './localstorage/localstorage';

const gallery = document.querySelector('.movie-gallery-list');

export default function markupList(data) {
  data.forEach(item => {
    const markup = movieCardTemplate(item);
    gallery.insertAdjacentHTML('beforeend', markup);
    const starBtns = document.querySelectorAll('.star-icon');
    if (starBtns.length) {
      const starBtn = starBtns[starBtns.length - 1];
      starBtn.addEventListener('click', addToFavHandler(item));

      if (isFilmInFavourites(item)) {
        starBtn.style.backgroundColor = 'red';
      }
    }
  });
}
