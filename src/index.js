const express = require("express");
const path = require("path");
//const socketIO = require('socket.io');
const http = require('http'); 

//inicialización de express
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
const cors = require('cors');


//settings
app.set('port', process.env.PORT || 3000);



//middleware
const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 // Para que el navegador no muestre un error de tipo 'preflight'
  }
app.use(cors(corsOptions)); // Habilitar CORS en todas las rutas

//sockets
require('./sockets')(io);

//static files
app.use(express.static(path.join(__dirname,"public")));

//starting server
server.listen(app.get('port'), () => {
    console.log('Server on port 3000')
});