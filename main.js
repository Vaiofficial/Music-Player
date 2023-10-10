//constants
const musicLibsContainer = document.getElementById('music-libs');
const audioPlayer = document.getElementById('audio_player');

var currentSongObj = {};
var defaultImage = "/Music-Player/assests/images/ppk2.jpg";


window.addEventListener("load", bootUpApp);

function bootUpApp() {
    fetchAndRenderAllSections();
}

function fetchAndRenderAllSections() {
    // renderSections(data);
    fetch('assests/gaana.json').then(res => res.json()).then(res => {
        console.log("response", res);
        const { cardbox } = res;
        if (Array.isArray(cardbox) && cardbox.length) {
            cardbox.forEach(section => {
                const { songsbox, songscards } = section;
                renderSections(songsbox, songscards);
            })
        }
    })
        .catch((err) => {
            console.log(err);
            alert("error")
        })
}

function renderSections(title, songsList) {
    const songsSection = makeSectionDom(title, songsList);
    musicLibsContainer.appendChild(songsSection)
}

function makeSectionDom(title, songsList) {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'songs-section';

    sectionDiv.innerHTML = `
        <h2 class="section-heading">${title}</h2>
        <div class="songs-cont">
                ${songsList.map(songObj => buildSongCardDom(songObj)).join('')}
         </div>
     `

    console.log(sectionDiv);
    return sectionDiv;
}

function buildSongCardDom(songObj) {
    return `<div class = "song-card" onclick="playSong(this)" data-songobj = '${JSON.stringify(songObj)}'>
    <div class="image-cont">
            <img src=" ${songObj.image_source}" alt="${songObj.song_name}">
            <div class="overlay"></div>
        </div>
        <p class="song-name">${songObj.song_name}</p>
  </div>`;
}


//MUSIC PLAYER FUNCTIONS

function playSong(songCardEl)
{
    const songObj = JSON.parse(songCardEl.dataset.songobj);
    console.log(songCardEl.dataset.songobj);
    setAndPlayCurrentSong(songObj);
}

function setCurrentSong(songObj)
{
    currentSongObj = songObj;
    audioPlayer.onpause();
    audioPlayer.src = songObj.quality.low;
    audioPlayer.currentTime = 0;
    audioPlayer.onplay();

    updatePlayerUi(songObj);
}
