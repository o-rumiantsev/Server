'use strict';

const net = require('net');

// const sockets = new Set();
// const server = net.createServer((socket) => {
//   sockets.forEach((sckt) => {
//     sckt.write(`Client ${socket.localAddress} connected\n`);
//   });
//   socket.setEncoding('utf8');
//   socket.on('data', (data) => {
//     sockets.forEach((sckt) => {
//       sckt.write(`📨  ${socket.localAddress}: ` + data);
//     });
//   });
//
//   socket.on('end', () => {
//     console.log(`Client ${socket.localAddress} disconnected`);
//     sockets.delete(socket);
//     sockets.forEach((sckt) => {
//       sckt.write(`Client ${socket.localPort} disconnected\n`);
//     });
//   });
//
// });
//
// server.listen(8080);
//
// server.on('error', (err) => {
//   throw err;
// });
//
// console.log(server.address());
//
// server.on('connection', (socket) => {
//   sockets.add(socket);
//   console.log(`Client ${socket.localAddress} ${socket.remoteAddress} connected`);
//   socket.write(`You are on server\nIP: ${socket.localAddress}\n`);
// });


const sockets = new Set();
const server = net.createServer((socket) => {
  sockets.forEach((sckt) => {
    sckt.write(`${socket.remotePort} connected\n`);
  });
  socket.setEncoding('utf8');
  socket.on('data', (data) => {
    sockets.forEach((sckt) => {
      sckt.write(`📨  ${socket.remotePort}: ` + data);
    });
  });

  socket.on('end', () => {
    console.log(`Client ${socket.remotePort} disconnected`);
    sockets.delete(socket);
    sockets.forEach((sckt) => {
      sckt.write(`${socket.remotePort} disconnected\n`);
    });
  });

});

server.listen(8080, '192.168.0.107');
// console.log(server.address());
server.on('error', (err) => {
  throw err;
});

server.on('connection', (socket) => {
  sockets.add(socket);
  console.log(`Client ${socket.remoteAddress} connected`);
  socket.write(`You are on server\nRemote port: ${socket.remotePort}\n`);
});
