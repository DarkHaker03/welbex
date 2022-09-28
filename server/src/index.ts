import { IncomingMessage, ServerResponse } from "http";
const controller = require('./data.controller');

const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  setHeaders(res)
  if (req.method === "GET") {
    console.log("GET");
    if (req.url === "/getData") {
      controller.getData().then((res2: any) => {
        console.log(res2);
        res.end(JSON.stringify(res2));
      });
    }
    else if (req.url === "/createData") {
      console.log("createData");
      controller.addData();
    }
    else if (req.url === "/deleteData") {
      console.log("createData");
      controller.deleteData();
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


function setHeaders(res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
}