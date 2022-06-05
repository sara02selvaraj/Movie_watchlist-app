const movieEl = document.getElementById('movie-input')
const formEl = document.getElementById('form-el')
const movieContent = document.getElementById('movie-content')

let selectedMovie = []
let movieList = [];
let existingMovie = JSON.parse(localStorage.getItem('movieList'))
if(existingMovie){
    movieList=[...existingMovie]
}

movieEl.addEventListener('focus', function(){
    this.value = ''
})

formEl.addEventListener('submit', async function(e) {
    e.preventDefault();
    let response = await fetch(`https://www.omdbapi.com/?s=${movieEl.value}&i=tt3896198&apikey=526a9387`)
    let data = await response.json();
    let searchList = data.Search.map((item) => {
         return item.imdbID
    })
    let result = [];
     searchList.map((id) => {
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=526a9387`)
        .then(response => response.json())
        .then(data => {
           result.push(data)
           selectedMovie= [...result]
           console.log(selectedMovie)
           let html = result.map((movie) => {
               return `<div class="movie-container">
               <div class="poster">
                   <img class="img-movie" src=${movie.Poster} alt=""/>
               </div>
               <div class="movie-info">
                   <h2>${movie.Title} <span class="rating"><i id="star" class="fa fa-star" aria-hidden="true"></i>${movie.imdbRating}</span></h2>
                   <div class="movie-details">
                       <p>${movie.Runtime}</p>
                       <p>${movie.Genre}</p>
                       <p><button class="action-btn" onclick="addMovielist('${movie.imdbID}')" id="watchlist-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>WatchList</button></p>
                   </div>
                   <p class="plot">${movie.Plot}</p>
               </div>
           </div>`
           })
           movieContent.innerHTML = html
        }
        )
    })     
})

function addMovielist(movieId) {
    let savedMovie = selectedMovie.find(movie => movie.imdbID === movieId)
    console.log(savedMovie)
    movieList.push(savedMovie)
    console.log(movieList)
    localStorage.setItem('movieList', JSON.stringify(movieList))
}

