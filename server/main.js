const app = require('./app')

const server = require('./webSocket')
const config = require('../config')


server.listen(config.portServer, function() {
  console.log("Servidor corriendo en http://localhost:"+config.portServer);
});
