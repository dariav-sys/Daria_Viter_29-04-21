import movieCardTemplate from '../templates/movie-card.hbs';
import { favBtnHandler } from './favourite-btn-handler';
import {
  isMovieInFavourites,
  
} from './localstorage';
import { markupFavourites } from './favourite-list';
import refs from './refs.js';

export function fetchMovies() {
  const url = 'https://my-json-server.typicode.com/moviedb-tech/movies/list';

  return fetch(url)
    .then(res => res.json())
    .then(data => markupList(data))
    .catch(err => console.log(err));
}

export function markupList(data) {
  data.forEach(item => {
    const markup = movieCardTemplate(item);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    const starBtns = document.querySelectorAll('.star-icon');
    if (starBtns.length) {
      const starBtn = starBtns[starBtns.length - 1];
      starBtn.addEventListener('click', favBtnHandler(item));

      if (isMovieInFavourites(item)) {
        starBtn.style.backgroundColor = 'orange';
        markupFavourites(item);
      }
    }
  });
}
