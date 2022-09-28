import { IncomingMessage, ServerResponse } from "http";
import { DataArguments } from './data.controller';
const controller = require('./data.controller');
const http = require('http');

const HOSTNAME = '127.0.0.1';
const PORT = 8080;

const server = http.createServer(({ method, url }: IncomingMessage, res: ServerResponse) => {
  setHeaders(res)
  if (method === "GET") {
    if (url === "/getData") {
      controller.getData().then((response: DataArguments) => {
        res.end(JSON.stringify(response));
      });
    }
    else if (url === "/addData") {
      controller.addData();
    }
    else if (url === "/deleteData") {
      controller.deleteData();
    }
  }
  res.end();
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});

function setHeaders(res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
}
