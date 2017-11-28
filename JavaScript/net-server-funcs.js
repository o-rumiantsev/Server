'use strict';

const connectionMsg = (sckt, socket) => {
  sckt.write(`${socket.remoteAddress} connected\n`);
};

const dataMsg = (data, socket, sockets) => {
  sockets.forEach((sckt) => {
    sckt.write(`📨  ${socket.remoteAddress}: ` + data);
  });
};

const endMsg = (socket, sockets) => {
  console.log(`Client ${socket.remoteAddress} disconnected`);
  sockets.delete(socket.remoteAddress);
  sockets.forEach((sckt) => {
    sckt.write(`${socket.remoteAddress} disconnected\n`);
  });
};

module.exports = {
  connectionMsg,
  dataMsg,
  endMsg
}
