import markupList from "./markup.js"

export default function fetchMovies() {
    const url  = "https://my-json-server.typicode.com/moviedb-tech/movies/list"

    return fetch(url)
    .then(res=>res.json())
    .then(data=>markupList(data))
    .catch(err=>console.log(err))
}

