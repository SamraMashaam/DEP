const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 4000;



const server = app.listen(PORT, () => console.log(`Server on port: ${PORT}`));
const io = require('socket.io')(server);
app.use(express.static(path.join(__dirname, 'public')));

let sockconn = new Set();

io.on('connection', onConn)

function onConn(socket){
    console.log('Connected: ',socket.id);
    sockconn.add(socket.id);

    io.emit('cltotal',sockconn.size);

    socket.on('disconnect', () => {
        console.log('Disconnected: ',socket.id);
        sockconn.delete(socket.id);
        io.emit('cltotal',sockconn.size);
    })

    socket.on('message', (data) => {
        console.log(data)
        socket.broadcast.emit('message', data)
      })
    
      socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data)
      })
}
