const express = require("express"),
  http = require("http"),
  path = require("path");

const bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  static = require("serve-static"),
  errorHandler = require("errorhandler"),
  expressErrorHandler = require("express-error-handler"),
  expressSession = require("express-session");

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", static(path.join(__dirname, "public")));

app.use(cookieParser());
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

const router = express.Router();
router.route("/public/process/login").post(function (req, res) {
  console.log("/public/process/login 호출됨");

  const paramId = req.body.id || req.query.id;
  const paramPw = req.body.password || req.query.password;
  console.log("paramId : " + paramId + ", paramPw : " + paramPw);

  if (database) {
    authUser(database, paramId, paramPw, function (err, docs) {
      if (err) {
        throw err;
      }
      if (docs) {
        console.dir(docs);
        const username = docs[0].name;
        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h1>로그인 성공</h1>");
        res.write("<div><p>사용자 아이디 : " + paramId + "</p></div>");
        res.write("<div><p>사용자 이름 : " + username + "</p></div>");
        res.write('<br><br><a href="/public/login.html">다시 로그인하기 </a>');
        res.end();
      }
    });
  } else {
    res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
    res.write("<h2>데이터베이스 연결 실패</h2>");
    res.write("<div><p>데이터베이스에 연결하지 못했습니다.</p></div>");
    res.end();
  }
});

app.use("/", router);

// MongoDB에 연결하기
const MongoClient = require("mongodb").MongoClient;

let database;

function connectDB() {
  const databaseUrl = "mongodb://localhost:27017/local";

  MongoClient.connect(databaseUrl, function (err, db) {
    if (err) throw err;

    console.log("데이터베이스에 연결되었습니다. : " + databaseUrl);
    database = db.db("local");
  });
}

const authUser = function (database, id, password, callback) {
  console.log("authUser 호출됨");

  const users = database.collection("users");
  let findUser = { id: id, password: password };
  console.log(findUser);
  //console.log(users.find(findUser));
  users.find(findUser).toArray(function (err, docs) {
    if (err) {
      callback(err, null);
      return;
    }

    console.log(docs);

    if (docs.length > 0) {
      console.log(
        "아이디 [%s], 비밀번호 [%s]가 일치하는 사용자 찾음.",
        id,
        password
      );
      callback(null, docs);
    } else {
      console.log("일치하는 사용자를 찾지 못함.");
      callback(null, null);
    }
  });
};

const addUser = function (database, id, password, name, callback) {
  console.log("addUser 호출됨 : " + id + ", " + password + ", " + name);

  const users = database.collection("users");

  users.insertMany([{ id: id, password: password, name: name }], function (
    err,
    result
  ) {
    if (err) {
      callback(err, null);
      return;
    }

    if (result.insertedCount > 0) {
      console.log("사용자 레코드 추가됨 : " + result.insertedCount);
    } else {
      console.log("추가된 레코드가 없음.");
    }

    callback(null, result);
  });
};

router.route("/process/adduser").post(function (req, res) {
  console.log("/process/adduser 호출됨");

  const paramId = req.body.id || req.query.id;
  const paramPw = req.body.password || req.query.password;
  const paramName = req.body.name || req.query.name;

  console.log("요청 파라미터 : " + paramId + ", " + paramPw + ", " + paramName);

  if (database) {
    addUser(database, paramId, paramPw, paramName, function (err, result) {
      if (err) {
        throw err;
      }
      if (result && result.insertedCount > 0) {
        console.dir(result);

        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h2>사용자 추가 성공</h2>");
        res.end();
      } else {
        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h2>사용자 추가 실패</h2>");
        res.end();
      }
    });
  } else {
    res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
    res.write("<h2>데이터베이스 연결 실패</h2>");
    res.end();
  }
});

const errorHandling = expressErrorHandler({
  static: {
    404: "./public/404.html",
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandling);

http.createServer(app).listen(app.get("port"), function () {
  console.log("서버가 시작되었습니다. 포트 : " + app.get("port"));

  connectDB();
});
