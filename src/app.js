// Se importa express.
import express from 'express';

// Se importa el __dirname, para poder usarlo en handlebars.
import __dirname from './utils.js';

// Se importa handlebars.
import handlebars from 'express-handlebars';

// Se importa el router de las vistas.
import viewsRouter from './routes/views.router.js';

// Se importa Server de socket.io.
import {
      Server
} from 'socket.io';

// Se crea la aplicación de express y un servidor http.
const app = express();
const PORT = 8080;
const httpServer = app.listen(PORT, () => {
      console.log(`Server escuchando desde el puerto ${PORT}`);
});

// Se crea el servidor de socket.io.
const io = new Server(httpServer);

// Se configura todo lo relacionado a plantillas.
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', viewsRouter);

// Explicación de lo que hace cada cosa: app.engine('handlebars', handlebars.engine()): se configura el motor de plantillas.
// app.set('views', __dirname + '/views'): se configura la carpeta donde se van a guardar las plantillas.
// app.set('view engine', 'handlebars'): se configura la extensión de las plantillas.
// app.use(express.static(__dirname + '/public')): se configura la carpeta donde se van a guardar los archivos estáticos, como css, js, etc. Principalmente se usa para guardar estilos o scripts que se van a usar en todas las páginas.
// app.use('/', viewsRouter): se configura el router de las vistas.

let messages = [];

// Se configura el socket.io.
io.on('connection', socket => {

      console.log("Nuevo cliente conectado!");

      socket.on('message', data => {

            messages.push(data);
            io.emit('messagesLogs', messages);
            console.log(data);

      });

      socket.on('authenticated', data => {

            socket.broadcast.emit('newUserConnected', data);

      });

      socket.on('disconnect', () => {

            console.log("Cliente desconectado!");
      });

});

// on = escuchar / recibir
// emit = emitir / enviar

// Explicación de lo que hace cada cosa: io.on('connection', socket => {}): se configura el evento de conexión.
// socket.on('message', data => {}): se configura el evento de mensaje.
// io.sockets.emit('message', data): se emite el evento de mensaje a todos los clientes conectados.
// socket.on('disconnect', () => {}): se configura el evento de desconexión.