'use strict'
const config = require('../config')

const app = require('./app')
const server = require('http').Server(app)
const io = require('socket.io')(server)

//---------- Web Socket -----------------------
//---------------------------------------------
io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets')

  socket.on('stream',function(image){
      socket.broadcast.emit('stream',image);
  })

  socket.on('disconnect', function(data) {
    console.log("Cliente desconectado")
  })
});

module.exports = server
