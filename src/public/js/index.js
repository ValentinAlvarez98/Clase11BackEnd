const socket = io();
let user;
let chatBox = document.getElementById('chatBox');

/*

      io hace referencia a "socket.io", se le llama así por convención.
      io() es una función que se ejecuta para crear una conexión con el servidor.
      La linea 1 permite instanciar un socket, que es una conexión entre el cliente y el servidor. Y guardarlo en la constante "socket".
      Dicho socket es el que utilizaremos para poder comunicarnos con el socket del servidor.
      (Recuerda que, en este punto somos "clientes", porque representamos una vista)

 */

socket.emit('message', "Tenemos una conexión abierta con el servidor");

swal.fire({
      title: 'Bienvenido a la sala de chat',
      input: 'text',
      text: 'Ingresa tu nombre de usuario:',
      inputValidator: (value) => {
            return !value && 'Por favor, ingresa tu nombre de usuario'
      },
      allowOutsideClick: false,
}).then((result) => {
      if (result.isConfirmed) {
            user = result.value;
            socket.emit('message', `El usuario: ${user} se ha conectado`);
      };
});

chatBox.addEventListener('keyup', e => {

      if (e.key === 'Enter') {

            if (chatBox.value.trim().length > 0) {

                  socket.emit('message', {
                        user: user,
                        message: chatBox.value
                  });
                  chatBox.value = "";

            };

      };

});

socket.on('messagesLogs', data => {

      let log = document.getElementById('messagesLogs');
      let messages = "";

      data.forEach(message => {

            if (message.user !== undefined && message.message !== undefined) {
                  messages = messages + `${message.user} dice: ${message.message} <br>`;
            } else {
                  return;
            };

      });

      log.innerHTML = messages;

});

socket.on("newUserConnected", data => {

      if (!user) return;

      swal.fire({
            text: "Se ha conectado un nuevo usuario",
            icon: "info",
            toast: true,
            position: "top-right",
      });

});