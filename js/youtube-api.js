let tag = document.createElement('script')

tag.src = "https://www.youtube.com/iframe_api"
let firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

let player
let videoId
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
  if (player.playerInfo.videoData.video_id === videoId)  {
    event.target.seekTo(seconds)
  }
  event.target.playVideo();
}

function onModalClose(){
  if (player.getPlayerState() == 0) {
    seconds = 0
    return
  }
  stopVideo()
  seconds = player.getCurrentTime()
  videoId = player.playerInfo.videoData.video_id
}