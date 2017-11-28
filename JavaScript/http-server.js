'use strict';

const fs   = require('fs');
const http = require('http');
const html = fs.readFileSync('../HTML/index.html');
// const css  = fs.readFileSync('./res/style.css');

const clients = new Set();

const server = http.createServer((req, res) => {
  console.log(req.url);

  switch (req.url) {
    // case '/style.css': {
    //   res.writeHead(200, { 'Content-Type': 'text/css' });
    //   res.write(css);
    //   break;
    // }
    default: {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(html);
    }
  }

  res.end();
}).listen(8080, '192.168.0.106');
