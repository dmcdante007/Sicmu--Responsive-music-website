// console.log("Hey Guys");

//Initilise the variable : Songs
let songIndex = 0;
let audioElement = new Audio("Songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressbar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");
let songlist = document.getElementsByClassName("songItemPlay");

let songs = [
  { songName: "Faded", filePath: "Songs/1.mp3", coverPath: "cover/cover1.jpg" },
  { songName: "Alone", filePath: "Songs/2.mp3", coverPath: "cover/cover2.jpg" },
  {
    songName: "All Falls Down",
    filePath: "Songs/3.mp3",
    coverPath: "cover/cover3.jpg",
  },
  {
    songName: "Sing me to Sleep",
    filePath: "Songs/4.mp3",
    coverPath: "cover/cover4.jpg",
  },
  {
    songName: "The Spectre",
    filePath: "Songs/5.mp3",
    coverPath: "cover/cover5.jpg",
  },
];

songItems.forEach((element, i) => {
  // console.log(element,i)
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
// audioElement.play()
//Handle Play/pause click

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    // console.log("it should play")
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    // console.log("it should play")
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif.style.opacity = 0;
  }
});
//listen to Events

//seekBar update
audioElement.addEventListener("timeupdate", () => {
  // console.log('timeUpdate');
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.add("fa-play");
      element.classList.remove("fa-stop");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      console.log(e.target);
      makeAllPlays();
      if (audioElement.paused) {
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        audioElement.src = `songs/${songIndex}.mp3`;
        audioElement.currentTime = "0";
        audioElement.play();
        masterPlay.classList.remove("fa-play");
        masterPlay.classList.add("fa-pause");
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex - 1].songName;
      } else {
        e.target.classList.remove("fa-pause");
        e.target.classList.add("fa-play");
        audioElement.pause();
        masterPlay.classList.add("fa-play");
        masterPlay.classList.remove("fa-pause");
        gif.style.opacity = 0;
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 5) {
    songIndex = 1;
  } else {
    songIndex += 1;
  }
  console.log(songIndex);
  makeAllPlays();
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.currentTime = "0";
  audioElement.play();
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
  masterSongName.innerText = songs[songIndex - 1].songName;
  gif.style.opacity = 1;
  Array.from(songlist)[songIndex - 1].classList.remove("fa-play");
  Array.from(songlist)[songIndex - 1].classList.add("fa-pause");
  songlist.style.opacity = 1;
  myProgressBar.value = "0";
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 1) {
    songIndex = 5;
  } else {
    songIndex -= 1;
  }
  console.log(songIndex);
  makeAllPlays();
  audioElement.src = `songs/${songIndex}.mp3`;
  audioElement.currentTime = "0";
  audioElement.play();
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
  masterSongName.innerText = songs[songIndex - 1].songName;
  gif.style.opacity = 1;
  Array.from(songlist)[songIndex - 1].classList.remove("fa-play");
  Array.from(songlist)[songIndex - 1].classList.add("fa-pause");
  myProgressBar.value = "0";
});
