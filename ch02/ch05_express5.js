const express = require("express"),
  http = require("http"),
  bodyParser = require("body-parser"),
  app = express(),
  expressErrorHandler = require("express-error-handler");

const router = express.Router();

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static(__dirname + "/public"));

router.route("/public/process/login/:name").post(function (req, res) {
  console.log("/public/process/login/:name 처리함.");

  const paramName = req.params.name;
  const paramId = req.body.id || req.query.id;
  const paramPwd = req.body.password || req.query.password;

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write("<div><p>ParamName : " + paramName + "</p></div>");
  res.write("<div><p>paramId : " + paramId + "</p></div>");
  res.write("<div><p>paramPwd: " + paramPwd + "</p></div>");
  res.write(
    '<br><br><a href ="/public/login2.html">로그인 페이지로 돌아가기</a>'
  );
  res.end();
});

app.use("/", router);

const errorhandle = expressErrorHandler({
  static: {
    404: "./public/404.html",
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorhandle);

http.createServer(app).listen(app.get("port"), function () {
  console.log("익스프레스 서버를 시작했습니다 : " + app.get("port"));
  console.log("path:" + __dirname);
});
