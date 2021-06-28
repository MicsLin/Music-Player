const musicContainer =document.querySelector('.music_container')
const playBtn =document.querySelector('#play')
const prevBtn =document.querySelector('#prev')
const nextBtn =document.querySelector('#next')
const audio =document.querySelector('#audio')
const progress =document.querySelector('.progress')
const progressContainer =document.querySelector('.progress_container')
const title =document.querySelector('#title')
const cover =document.querySelector('#cover')

// song titles
const songs =['hey','summer','ukulele']

// keep track of songs
let songIndex = 2

// Initially load song info DOM
loadSong(songs[songIndex])

function loadSong(song) {
    title.innerText = song
    audio.src =`music/${song}.mp3`
    cover.src =`img/${song}.jpg`
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    
    audio.pause()

}
function prevSong() {
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length -1
    }
    loadSong(songs[songIndex])
    playSong()
}
function nextSong() {
    songIndex++
    if(songIndex >songs.length -1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

function updateProgress(e) {
    // currentTime 現在、duration 總時
    const {duration,currentTime}=e.srcElement
    const progressPercent =(currentTime/duration)*100

    progress.style.width =`${progressPercent}%`

}

// 擷取音樂進度 e=MouseEvent
function setProgress(e) {
    // 先擷取進度條寬度
    const width = this.clientWidth
    // 在擷取目前按到的位置
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
    
}

// Event listeners
playBtn.addEventListener('click',()=>{
    const isPlaying =musicContainer.classList.contains('play')

    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})

// Change song events
prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)

// timeupdate是內建api
audio.addEventListener('timeupdate',updateProgress)

progressContainer.addEventListener('click',setProgress)

audio.addEventListener('ended',nextSong)