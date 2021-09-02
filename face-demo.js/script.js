const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tnyFace
])

function startVideo() {
  navigator.getUserMedia(
    {video: {} },
    stream => video.srcObject = stream,
    err => console.log(err)
  )
}

startVideo()