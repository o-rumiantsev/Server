'use strict';

const net = require('net');

const sockets = new Map();
const server = net.createServer((socket) => {
  const ip = socket.remoteAddress;
  if (!sockets.has(ip)) {
    sockets.set(ip, socket);

    console.log(`Client ${ip} connected`);
    socket.write(`You are on server\nIP: ${ip}\n`);

    sockets.forEach((sckt) => {
      sckt.write(`${socket.remoteAddress} connected\n`);
    });

    socket.setEncoding('utf8');
    socket.on('data', (data) => {
      sockets.forEach((sckt) => {
        sckt.write(`📨  ${socket.remoteAddress}: ` + data);
      });
    });

    socket.on('end', () => {
      console.log(`Client ${socket.remoteAddress} disconnected`);
      sockets.delete(ip);
      sockets.forEach((sckt) => {
        sckt.write(`${socket.remoteAddress} disconnected\n`);
      });
    });
  } else socket.end();
});

server.listen(8080, '192.168.0.107');
server.on('error', (err) => {
  throw err;
});
