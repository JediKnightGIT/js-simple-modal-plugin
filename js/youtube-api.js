let tag = document.createElement('script')

tag.src = "https://www.youtube.com/iframe_api"
let firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

let player
let isReady = false 
let seconds = 0

function stopVideo() {
  player.pauseVideo()
}

function onYouTubeIframeAPIReady() {
  isReady = true
}

function onModalOpen(id) {
  if (isReady) {
    player = new YT.Player('player', {
      height: '315',
      width: '460',
      videoId: id,
      events: {
        'onReady': onPlayerReady
      }
    });
  }
}

function onPlayerReady(event) {
  event.target.playVideo();
  event.target.seekTo(seconds)
}

function onModalClose(){
  stopVideo()
  seconds === YT.PlayerState.ENDED ? seconds = player.getCurrentTime() : seconds = 0
  player =  null;
}