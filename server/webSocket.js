'use strict'
const config = require('../config')
var fs = require('fs')
var https = require('https')
const app = require('./app')
const server = require('https').createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
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
