const movieContent = document.getElementById('movie-content')
let moviesList = []
getMovieList()

function getMovieList() {
    moviesList = JSON.parse(localStorage.getItem('movieList'))
   console.log(moviesList)
   let html =''
   if(moviesList.length > 0){
     html = moviesList.map((movie) => {
        return `<div class="movie-container">
        <div class="poster">
            <img class="img-movie" src=${movie.Poster} alt=""/>
        </div>
        <div class="movie-info">
            <h2>${movie.Title} <span class="rating"><i id="star" class="fa fa-star" aria-hidden="true"></i>${movie.imdbRating}</span></h2>
            <div class="movie-details">
                <p>${movie.Runtime}</p>
                <p>${movie.Genre}</p>
                <p><button class="action-btn" onclick="removeMovie('${movie.Title}')" id="remove-btn"><i class="fa fa-minus-circle" aria-hidden="true"></i>Remove</button></p>
            </div>
            <p class="plot">${movie.Plot}</p>
        </div>
    </div>`
    })
   }else {
       html = `<div class="empty">
                <h3>your watchlist is looking a little empty...</h3>
                <p class="dark-text"><a href="index.html"><i class="fa fa-plus-circle" aria-hidden="true"></i>Lets add some movies!</a></p>
            </div>`
   }

   movieContent.innerHTML = html
}

function removeMovie(title) {
    let selectedMovie = moviesList.find((movie) => movie.Title === title)
   let index =moviesList.indexOf(selectedMovie)
   moviesList.splice(index,1)
   localStorage.setItem('movieList',JSON.stringify(moviesList))
   getMovieList()
}