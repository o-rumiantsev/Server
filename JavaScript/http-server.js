'use strict';

const fs   = require('fs');
const http = require('http');
const html = fs.readFileSync('../HTML/index.html');
const js = fs.readFileSync('../HTML/script.js');

const options = {
  port: 8080,
  host: '10.25.128.234'
};

const sockets = new Map();
const agent = new http.Agent({ keepAlive: true });

const server = http.createServer((req, res) => {
  const socket = agent.createConnection(options, () => {
    const ip = socket.remoteAddress;
    console.log(ip + ' connected');
    sockets.set(ip, socket);
    socket.on('data', (data) => {
      console.log(data);
    });
    socket.on('end', () => {
      console.log(ip + ' disconnected');
    });
  });

  switch (req.url) {
    case '/script.js': {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(js);
      break;
    }
    default: {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(html);
    }
  }

  res.end();
}).listen(8080, '10.25.128.234');

server.on('error', (err) => {
  throw err;
});
