import modalTemplate from '../templates/modal-window.hbs';
import { fetchMovies } from './movie-list.js';
import { isMovieInFavourites } from './localstorage.js';
import { modalFavBtnHandler } from './favourite-btn-handler';
import refs from './refs.js';

fetchMovies();

refs.gallery.addEventListener('click', modalWindowHandler);
refs.overlay.addEventListener('click', onOverlayClickHandler);

function modalWindowHandler(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  let film_ID = event.target.dataset.id;
  fetchMovieById(film_ID);
}

export function fetchMovieById(id) {
  const url = `https://my-json-server.typicode.com/moviedb-tech/movies/list/${id}`;

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      modalMarkup(data);
      const modalFavBtn = document.querySelector('.star-icon-modal');
      if (isMovieInFavourites(data)) {
        modalFavBtn.style.backgroundColor = 'orange';
      }
      modalFavBtn.addEventListener('click', modalFavBtnHandler(data));
    })
    .catch(err => console.log(err));
}

function modalMarkup(data) {
  refs.modalWindow.classList.remove('is-hidden');
  let movieGenres = [];
  data.genres.forEach(el => {
    movieGenres.push(' ' + el);
  });
  data.genres = movieGenres;
  const markup = modalTemplate(data);
  refs.modalContent.insertAdjacentHTML('beforeend', markup);
  const closeModalBtn = document.querySelector('.modal-close-button');
  closeModalBtn.addEventListener('click', onCloseModal);
  window.addEventListener('keydown', onPressKey);
}

function onCloseModal() {
  window.removeEventListener('keydown', onPressKey);
  refs.modalWindow.classList.add('is-hidden');
  refs.modalContent.innerHTML = '';
}

export function onPressKey(event) {
  if (event.code === 'Escape') onCloseModal();
}

function onOverlayClickHandler(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}
