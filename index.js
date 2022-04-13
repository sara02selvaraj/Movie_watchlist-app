const movieEl = document.getElementById('movie-input')
const formEl = document.getElementById('form-el')
const movieContent = document.getElementById('movie-content')


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
    let response = await fetch(`http://www.omdbapi.com/?s=${movieEl.value}&i=tt3896198&apikey=526a9387`)
    let data = await response.json();
    console.log(data.Search)
    let searchList = data.Search.map((item) => {
         return item.imdbID
    })
    let result = [];
     searchList.map((id) => {
        fetch(`http://www.omdbapi.com/?i=${id}&apikey=526a9387`)
        .then(response => response.json())
        .then(data => {
           result.push(data)
           console.log(result)
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
                       <p><button class="action-btn" id="watchlist-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>WatchList</button></p>
                   </div>
                   <p class="plot">${movie.Plot}</p>
               </div>
           </div>`
           })
           movieContent.innerHTML = html
        }
        )
    })
//     movieContent.innerHTML = `<div class="movie-container">
//     <div class="poster">
//         <img class="img-movie" src=${data.Poster} alt=""/>
//     </div>
//     <div class="movie-info">
//         <h2>${data.Title} <span class="rating"><i id="star" class="fa fa-star" aria-hidden="true"></i>${data.imdbRating}</span></h2>
//         <div class="movie-details">
//             <p>${data.Runtime}</p>
//             <p>${data.Genre}</p>
//             <p><button class="action-btn" id="watchlist-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>WatchList</button></p>
//         </div>
//         <p class="plot">${data.Plot}</p>
//     </div>
// </div>`
//     const watchlistBtn = document.getElementById('watchlist-btn')
//     watchlistBtn.addEventListener('click', () => {
//         addMovielist(data)
//      })
     
})

function addMovielist(data) {
    movieList.push(data)
    console.log(movieList)
    localStorage.setItem('movieList', JSON.stringify(movieList))
}

