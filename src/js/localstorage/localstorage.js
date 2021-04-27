export function isFilmInFavourites(film) {
  let addedToLocalstorage = JSON.parse(localStorage.getItem('favourites'));
  if (!addedToLocalstorage) return false;
  return addedToLocalstorage.find(item => item.id === film.id);
}

export function addToFavHandler(data) {
  return function () {
    let addedToLocalstorage = JSON.parse(localStorage.getItem('favourites'));
    if (!addedToLocalstorage) addedToLocalstorage = [];

    if (!isFilmInFavourites(data)) {
      addedToLocalstorage.push(data);
      localStorage.setItem('favourites', JSON.stringify(addedToLocalstorage));

      this.style.backgroundColor = 'red';
    } else {
      addedToLocalstorage.forEach(movie => {
        if (movie.id === data.id) {
          addedToLocalstorage.splice(addedToLocalstorage.indexOf(movie), 1);
        }
      });
      localStorage.setItem('favourites', JSON.stringify(addedToLocalstorage));

      this.style.backgroundColor = 'transparent';
    }
  };
}
