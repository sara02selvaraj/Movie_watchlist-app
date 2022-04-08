const movieContent = document.getElementById('movie-content')
getMovieList()

function getMovieList() {
   let moviesList = JSON.parse(localStorage.getItem('movieList'))
   console.log(moviesList)
   let html = moviesList.map((movie) => {
       return `<div class="movie-container">
       <div class="poster">
           <img class="img-movie" src=${movie.Poster} alt=""/>
       </div>
       <div class="movie-info">
           <h2>${movie.Title} <span class="rating"><i id="star" class="fa fa-star" aria-hidden="true"></i>${movie.imdbRating}</span></h2>
           <div class="movie-details">
               <p>${movie.Runtime}</p>
               <p>${movie.Genre}</p>
               <p><button id="remove-btn"><i class="fa fa-minus-circle" aria-hidden="true"></i>Remove</button></p>
           </div>
           <p>${movie.Plot}</p>
       </div>
   </div>`
   })

   movieContent.innerHTML = html
}

function removeMovie(item) {
    moviesList = moviesList.filter((movie) => movie.index !== item.index ) 
}