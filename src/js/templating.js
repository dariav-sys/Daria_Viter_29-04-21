import modalTemplate from '../templates/modal-window.hbs';
import fetchMovies from './fetchMovies';

const gallery = document.querySelector('.movie-gallery-list');
const modalContent = document.querySelector('.modal-content');
const overlay = document.querySelector('.modal-overlay');
const modalWindow = document.querySelector('.modal');

fetchMovies()

gallery.addEventListener('click', onOpenModal);
overlay.addEventListener('click', onOverlayClick);

function onOpenModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  let film_ID = event.target.dataset.id;

  function fetchMovieById(id) {
    const url = `https://my-json-server.typicode.com/moviedb-tech/movies/list/${id}`;

    return fetch(url)
      .then(res => res.json())
      .then(data => modalMarkup(data))
      .catch(err => console.log(err));
  }

  fetchMovieById(film_ID);
}

function modalMarkup(data) {
  modalWindow.classList.remove('is-hidden');

  let movieGenres = [];

  data.genres.forEach(el => {
    movieGenres.push(' ' + el);
  });

  data.genres = movieGenres;

  const markup = modalTemplate(data);
  modalContent.insertAdjacentHTML('beforeend', markup);

  const closeModalBtn = document.querySelector('.modal-close-button');
  closeModalBtn.addEventListener('click', onCloseModal);

  window.addEventListener('keydown', onPressKey);
}

function onCloseModal() {
  window.removeEventListener('keydown', onPressKey);
  modalWindow.classList.add('is-hidden');
  modalContent.innerHTML = '';
}

export function onPressKey(event) {
  if (event.code === 'Escape') onCloseModal();
}

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}
