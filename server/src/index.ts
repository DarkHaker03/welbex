import { IncomingMessage, ServerResponse } from "http";
const controller = require('./data.controller');

const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.method === 'POST') {
    controller.createData();
  }
  if (req.method === "GET") {
    console.log('GET');
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});