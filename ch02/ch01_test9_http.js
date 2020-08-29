const http = require("http");

const server = http.createServer();

const port = 3000;
//const host = "172.18.87.65";

server.listen(port, function () {
  console.log("웹 서버가 시작되었습니다.\n포트번호 : %d", port);
});

server.on("connection", function (socket) {
  const addr = socket.address();
  console.log("클라이언트가 접속했습니다. : %s, %d", addr.address, addr.port);
});

server.on("request", function (req, res) {
  console.log("클라이언트 요청이 들어왔습니다");
  console.dir(req);

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write(
    '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>First Node Page</title></head><body><h1>Hello, Node.js!</h1></body></html>'
  );
  res.end();
});

server.on("close", function () {
  console.log("서버가 종료됩니다");
});
