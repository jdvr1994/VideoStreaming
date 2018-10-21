var socket = io();

var loggerObj = document.getElementById("logger");
var canvas = document.getElementById("preview");
var context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;
context.width = canvas.width;
context.height = canvas.height;

var video = document.getElementById("video");

function logger(msg){
  var html = `<em>${msg}</em>`;

  loggerObj.innerHTML = html;
}

function loadCam(stream){
  logger('Camara cargada')
  const mediaSource = stream;
  try {
    video.srcObject = stream;
  } catch (error) {
    video.src = URL.createObjectURL(stream);
  }
}

function loadFail(){
  logger('camara no conectada!')
}

function viewVideo(video,context){
  context.drawImage(video,0,0,context.width,context.height);
  socket.emit('stream',canvas.toDataURL('image/webp'));
}

$(function(){
  navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navogator.msgGetUserMedia);
  if(navigator.getUserMedia){
    navigator.getUserMedia({video: true},loadCam,loadFail);
  }

  setInterval(function(){
    viewVideo(video,context);
  },16)

})
