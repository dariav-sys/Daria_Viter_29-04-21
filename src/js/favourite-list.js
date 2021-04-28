import refs from './refs.js';
import favTemplate from '../templates/fav-window.hbs';
import { fetchMovieById } from './modal-window.js';

export function markupFavourites() {
  let addedToLocalstorage = JSON.parse(localStorage.getItem('favourites'));
  if (!addedToLocalstorage) addedToLocalstorage = [];
  refs.favSection.innerHTML = '';
  refs.favSection.insertAdjacentHTML('beforeend', '<h1>FAVOURITES</h1>');
  addedToLocalstorage.forEach(data => {
    markupFavouritesNode(data);
  });
}

function markupFavouritesNode(data) {
  const markup = favTemplate(data);
  refs.favSection.insertAdjacentHTML('beforeend', markup);

  const favMovies = document.querySelectorAll('.movie-name');
  if (favMovies.length) {
    const favMovie = favMovies[favMovies.length - 1];
    favMovie.addEventListener('click', function () {
      fetchMovieById(data.id);
    });
  }

  const deleteBtns = document.querySelectorAll('.delete-movie-btn');
  if (deleteBtns.length) {
    const deleteBtn = deleteBtns[deleteBtns.length - 1];
    deleteBtn.addEventListener('click', removeFromFav(data));
  }
}

function removeFromFav(data) {
  return function () {
    let addedToLocalstorage = JSON.parse(localStorage.getItem('favourites'));
    addedToLocalstorage.forEach(movie => {
      if (movie.id === data.id) {
        addedToLocalstorage.splice(addedToLocalstorage.indexOf(movie), 1);
      }
    });
    localStorage.setItem('favourites', JSON.stringify(addedToLocalstorage));

    const allMovies = document.querySelectorAll('.movie-gallery-item');
    allMovies.forEach(movie => {
      if (parseInt(movie.dataset.id) === data.id) {
        const starBtn = movie.querySelector('.star-icon');
        starBtn.style.backgroundColor = 'transparent';
      }
    });

    this.parentNode.parentNode.removeChild(this.parentNode);
  };
}
