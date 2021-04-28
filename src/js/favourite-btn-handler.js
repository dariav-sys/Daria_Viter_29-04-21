import {
  isMovieInFavourites,
  saveMovieToFavourites,
  removeMovieFromFavourites,
} from './localstorage';
import { markupFavourites } from './favourite-list';

export function favBtnHandler(data) {
  return function () {
    if (!isMovieInFavourites(data)) {
      saveMovieToFavourites(data);
      this.style.backgroundColor = 'orange';
    } else {
      removeMovieFromFavourites(data);
      this.style.backgroundColor = 'transparent';
    }

    markupFavourites();
  };
}

export function modalFavBtnHandler(data) {
  return function () {
    if (!isMovieInFavourites(data)) {
      saveMovieToFavourites(data);
      this.style.backgroundColor = 'orange';
      updateFavButton(data, true);
    } else {
      removeMovieFromFavourites(data);
      this.style.backgroundColor = 'transparent';
      updateFavButton(data, false);
    }
    markupFavourites();
  };
}

function updateFavButton(movie, isEnabled) {
  const allMovies = document.querySelectorAll('.movie-gallery-item');
  allMovies.forEach(data => {
    if (parseInt(data.dataset.id) === movie.id) {
      const starBtn = data.querySelector('.star-icon');
      starBtn.style.backgroundColor = isEnabled ? 'orange' : 'transparent';
    }
  });
}
