const express = require("express"),
  http = require("http");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use("/public", express.static(__dirname + "/public"));
// express에 static이 합쳐지면서 serve_static을 불러오지 않아도 사용할 수 있다

app.use(function (req, res, next) {
  console.log("첫 번째 미들웨어에서 요청을 처리함.");

  const userAgent = req.header("User-Agent");
  const paramName = req.query.name;

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write("<div><p>User-Agent : " + userAgent + "</p></div>");
  res.write("<div><p>Param name : " + paramName + "</p></div>");
  res.end();
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("익스프레스 서버를 시작했습니다 : " + app.get("port"));
});
