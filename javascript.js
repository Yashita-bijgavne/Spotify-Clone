console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songss = [
    {songName: "As it was - Harry Styles", filePath: "song/1.mp3", coverPath: "songicons/asitwas.jpeg"},
    {songName: "Blinding lights - The Weeknd", filePath: "song/2.mp3", coverPath: "songicons/lights.jpeg"},
    {songName: "Heat waves - Glass Animals", filePath: "song/3.mp3", coverPath: "songicons/heat.jpeg"},
    {songName: "Stay - Justin Bieber", filePath: "song/4.mp3", coverPath: "songicons/stay.jpeg"},
    {songName: "Woman - Doja Cat", filePath: "song/5.mp3", coverPath: "songicons/woman.jpeg"},
    {songName: "Save your tears - The Weeknd", filePath: "song/6.mp3", coverPath: "songicons/save.jpeg"},
    {songName: "Make you Mine - PUBLIC", filePath: "song/7.mp3", coverPath: "songicons/make.jpeg"},
    {songName: "Leave the door open - Anderson Paak,Bruno Mars", filePath: "song/8.mp3", coverPath: "songicons/leave.jpeg"},
    
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songss[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songss[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `song/${songIndex+1}.mp3`;
        masterSongName.innerText = songss[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songss[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songss[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})