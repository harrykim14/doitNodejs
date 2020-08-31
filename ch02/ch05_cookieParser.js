const express = require("express"),
  http = require("http"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  app = express(),
  expressErrorHandler = require("express-error-handler");

const router = express.Router();

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/public", express.static(__dirname + "/public"));

router.route("/public/showCookie").get(function (req, res) {
  console.log("/public/showCookie 호출됨.");

  res.send(req.cookies);
});

router.route("/public/setUserCookie").get(function (req, res) {
  console.log("/public/setUserCookie 호출됨.");

  res.cookie("user", {
    id: "mike",
    name: "소녀시대",
    authorized: true,
  });

  res.redirect("/public/showCookie");
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
