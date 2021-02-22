/*const searchSongs=async()=>{

    const searchText = document.getElementById('search-field').value;
    const url =`https://api.lyrics.ovh/suggests/:${searchText}`
    try {
        const res = await fetch(url)
        const data = await res.json() // await mins opekha kora result asha porjonoto
        displaySongs(data.data) 
    } catch (error) {
        displayError('Sorry faild to load');
    }

}*/

document.getElementById("search-field").addEventListener("keypress", function(event) {
    if (event.key === 'Enter'){
        document.getElementById('search-button').click();
    }  
});

const searchSongs=()=>{
    const searchText = document.getElementById('search-field').value;
    const url =`https://api.lyrics.ovh/suggest/:${searchText}`
    toggleSpinner();    
    fetch(url)
    .then( res => res.json())
    .then(data => displaySongs(data.data))
    .catch( error => displayError('Something Went Wrong!! Please try again later!') )
}


const displaySongs = songs =>{
    console.log(songs);
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML ='';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-item-center my-3 p-3'
        songDiv.innerHTML = `
        <div class="col-md-9">
            
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
            <br>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
        toggleSpinner();
    });
}

const getLyric =(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then( res => res.json())
    .then(data => displayLyrics(data.lyrics))
    .catch( error => displayError("Sorry i can't get any lyrics"))
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}

const toggleSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    const songs = document.getElementById('song-container');
    spinner.classList.toggle('d-none');
    songs.classList.toggle('d-none');
    /*
    if (check) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }*/
}