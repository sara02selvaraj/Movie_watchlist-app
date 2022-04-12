const movieEl = document.getElementById('movie-input')
const formEl = document.getElementById('form-el')
const movieContent = document.getElementById('movie-content')

let movieList = []

movieEl.addEventListener('focus', function(){
    this.value = ''
})

formEl.addEventListener('submit', async function(e) {
    e.preventDefault();
    let response = await fetch(`http://www.omdbapi.com/?t=${movieEl.value}&i=tt3896198&apikey=526a9387`)
    let data = await response.json();
    console.log(data)
    movieContent.innerHTML = `<div class="movie-container">
    <div class="poster">
        <img class="img-movie" src=${data.Poster} alt=""/>
    </div>
    <div class="movie-info">
        <h2>${data.Title} <span class="rating"><i id="star" class="fa fa-star" aria-hidden="true"></i>${data.imdbRating}</span></h2>
        <div class="movie-details">
            <p>${data.Runtime}</p>
            <p>${data.Genre}</p>
            <p><button id="watchlist-btn"><i class="fa fa-plus-circle" aria-hidden="true"></i>WatchList</button></p>
        </div>
        <p>${data.Plot}</p>
    </div>
</div>`
    const watchlistBtn = document.getElementById('watchlist-btn')
    watchlistBtn.addEventListener('click', () => {
        addMovielist(data)
     })
     
})

function addMovielist(data) {
    movieList.push(data)
    console.log(movieList)
    localStorage.setItem('movieList', JSON.stringify(movieList))
}

