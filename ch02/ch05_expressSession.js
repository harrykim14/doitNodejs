const express = require("express"),
  http = require("http"),
  bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  expressSession = require("express-session"),
  app = express(),
  expressErrorHandler = require("express-error-handler");

const router = express.Router();

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/public", express.static(__dirname + "/public"));

router.route("/process/product").get(function (req, res) {
  console.log("/process/product 호출됨.");
  console.log(req.session.userName);
  if (req.session.userName) {
    res.redirect("/public/product.html");
  } else {
    res.redirect("/public/login2.html");
  }
});

router.route("/public/process/login").post(function (req, res) {
  console.log("/process/login 호출됨.");
  const paramId = req.body.id || req.query.id;
  const paramPwd = req.body.password || req.query.password;

  if (req.session.userName) {
    console.log("이미 로그인 되어 상품 페이지로 이동합니다.");
    res.redirect("/public/product.html");
  } else {
    console.log("세션에 정보를 저장합니다.");
    req.session.userName = {
      id: paramId,
      name: "소녀시대",
      authorized: true,
    };
    req.session.save();
    // 야!!!!! save 해줘야 저장되잖아!!!!!!!!!
  }

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("<h1>로그인 성공</h1>");
  res.write("<div><p>Param id : " + paramId + "</p></div>");
  res.write("<div><p>Param password : " + paramPwd + "</p></div>");
  res.write('<br><br><a href="/process/product">상품 페이지로 이동하기</a>');
});

router.route("/process/logout").get(function (req, res) {
  console.log("/process/logout 호출됨");

  if (req.session.userName) {
    console.log("로그아웃합니다");
    req.session.destroy(function (err) {
      if (err) {
        throw err;
      }

      console.log("세션을 삭제하고 로그아웃되었습니다.");
      res.redirect("/public/login2.html");
    });
  } else {
    console.log("아직 로그인되어 있지 않습니다.");
    res.redirect("/public/login2.html");
  }
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
