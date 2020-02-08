// conecting js to the dom
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const artistName = document.getElementById("artist");
const image = document.getElementById("cover");
const songName = document.getElementById("song-name");
const musicContainer = document.querySelector(".music-container");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");

const music = [
  {
    artist: "Travis Scott",
    title: "Highest in the room",
    img: "./images/Travis-Scott-img.jpg"
  },
  {
    artist: "Post Malone",
    title: "Wow",
    img: "./images/Post-Malone-img.jpg"
  },
  {
    artist: "The Weekend",
    title: "Blinding lights",
    img: "./images/The-weekend-img.jpg"
  },
  {
    artist: "Tones and I",
    title: "Dance Monkey",
    img: "./images/Tones-and-i-img.jpg"
  }
];
let musicIndex = 1;

//event listners

// play button event listner
playBtn.addEventListener("click", playPause);
// listner for the time update bar
audio.addEventListener("timeupdate", updateProgress);
// listner for the forward button
nextBtn.addEventListener("click", nextSong);
// listner for the previous button
prevBtn.addEventListener("click", prevSong);
// listner for the end of a song
audio.addEventListener("ended", nextSong);
//listner for a click on the progress bar container
progressBar.addEventListener("click", setProgress);

//FUNCTIONS
// the control of the play/pause btn
function playPause() {
  const isPlaying = musicContainer.classList.contains("play");
  if (!isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
}

//function thet plays the song
function playSong() {
  musicContainer.classList.add("play");

  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
}
// function that pauses the song that is being played

function pauseSong() {
  musicContainer.classList.remove("play");

  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

// load the right song based on the current index
function loadSong(index) {
  cover.src = music[musicIndex].img;
  audio.src = `./music/${music[musicIndex].title}.mp3`;
  artistName.innerText = music[musicIndex].artist;
  songName.innerText = music[musicIndex].title;
}

//updating the width of the colored progress bar based on the song state
function updateProgress() {
  const duration = audio.duration;
  const currTime = audio.currentTime;
  const percentage = (currTime * 100) / duration;
  progress.style.width = `${percentage}%`;
}
//function that plays the folowing song
function nextSong() {
  musicIndex = musicIndex + 1;
  if (musicIndex > music.length - 1) {
    musicIndex = 0;
    loadSong(musicIndex);
    playSong();
  } else {
    loadSong(musicIndex);
    playSong();
  }
}
//
function prevSong() {
  musicIndex = musicIndex - 1;
  if (musicIndex < 0) {
    musicIndex = music.length - 1;
    loadSong(musicIndex);
    playSong();
  } else {
    loadSong(musicIndex);
    playSong();
  }
}
// function to manualy change the progress of the song
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
