export function isMovieInFavourites(movie) {
  let addedToLocalstorage = JSON.parse(localStorage.getItem('favourites'));
  if (!addedToLocalstorage) return false;
  return addedToLocalstorage.find(data => data.id === movie.id);
}

export function saveMovieToFavourites(movie) {
  if (!isMovieInFavourites(movie)) {
    let addedToLocalstorage = JSON.parse(localStorage.getItem('favourites'));
    if (!addedToLocalstorage) addedToLocalstorage = [];
    addedToLocalstorage.push(movie);
    localStorage.setItem('favourites', JSON.stringify(addedToLocalstorage));
  }
}

export function removeMovieFromFavourites(movie) {
  let addedToLocalstorage = JSON.parse(localStorage.getItem('favourites'));
  if (!addedToLocalstorage) addedToLocalstorage = [];
  addedToLocalstorage.forEach(data => {
    if (data.id === movie.id) {
      addedToLocalstorage.splice(addedToLocalstorage.indexOf(data), 1);
    }
  });
  localStorage.setItem('favourites', JSON.stringify(addedToLocalstorage));
}
