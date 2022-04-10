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

