const express = require("express"),
  http = require("http"),
  path = require("path");

const bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  static = require("serve-static"),
  errorHandler = require("errorhandler"),
  expressErrorHandler = require("express-error-handler"),
  expressSession = require("express-session");

const mongoose = require("mongoose"),
  mongodb = require("mongodb"),
  crypto = require("crypto");

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
let UserSchema;
let UserModel;

function connectDB() {
  const databaseUrl = "mongodb://localhost:27017/local";

  console.log("데이터베이스 연결을 시도합니다.");

  //mongoose.Promise = global.Promise;
  mongoose.connect(databaseUrl);
  database = mongoose.connection;

  database.on(
    "error",
    console.error.bind(console, "mongoose connection error")
  );
  database.on("open", function () {
    console.log("데이터베이스에 연결되었습니다. : " + databaseUrl);
    mongoose.set("useCreateIndex", true);

    createUserSchema();

    doText();

    // UserSchema.static("findById", function (id, callback) {
    //   return this.find({ id: id }, callback);
    // });

    // UserSchema.static("findAll", function (callback) {
    //   return this.find({}, callback);
    // });

    console.log("Schema 정의 완료");

    UserModel = mongoose.model("users2", UserSchema);

    console.log("Model 정의 완료");
  });

  database.on("disconnected", connectDB);
}

function createUserSchema() {
  UserSchema = mongoose.Schema({
    id: { type: String, required: true, unique: true, default: " " },
    hashed_password: { type: String, required: true, default: " " },
    salt: { type: String, required: true },
    name: { type: String, index: "hashed" },
    age: { type: Number, default: -1 },
    created_at: { type: Date, index: { unique: false }, default: Date.now },
    updated_at: { type: Date, index: { unique: false }, default: Date.now },
  });

  UserSchema.virtual("info")
    .set(function (info) {
      let splitted = info.split(" ");
      this.id = splitted[0];
      this.name = splitted[1];
      console.log("virtual info 설정 : %s, %s", this.id, this.name);
    })
    .get(function () {
      return this.id + " " + this.name;
    });

  UserSchema.virtual("password")
    .set(function (password) {
      this._password = password;
      this.salt = this.makeSalt();
      this.hashed_password = this.encryptPassword(password);
      console.log("virtual password 호출됨 : " + this.hashed_password);
    })
    .get(function () {
      return this._password;
    });

  UserSchema.method("encryptPassword", function (plainText, inSalt) {
    if (inSalt) {
      return crypto.createHmac("sha1", inSalt).update(plainText).digest("hex");
    } else {
      return crypto
        .createHmac("sha1", this.salt)
        .update(plainText)
        .digest("hex");
    }
  });

  UserSchema.method("makeSalt", function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  });

  UserSchema.method("authenticate", function (
    plainText,
    inSalt,
    hashed_password
  ) {
    if (inSalt) {
      console.log(
        "authenticate 호출됨 : %s -> %s : %s".plainText,
        this.encryptPassword(plainText, inSalt),
        hashed_password
      );
      return this.encryptPassword(plainText, inSalt) === hashed_password;
    } else {
      console.log(
        "authenticate 호출됨 : %s -> %s : %s",
        plainText,
        this.encryptPassword(plainText),
        this.hashed_password
      );
      return this.encryptPassword(plainText) === this.hashed_password;
    }
  });

  UserSchema.path("id").validate(function (id) {
    return id.length;
  }, "id 칼럼의 값이 없습니다.");

  UserSchema.path("name").validate(function (name) {
    return name.length;
  }, "name 칼럼의 값이 없습니다.");

  UserModel = mongoose.model("users4", UserSchema);
  console.log("UserModel defined");
}

function doText() {
  const user = new UserModel({ info: "test01 소녀시대" });

  user.save(function (err) {
    if (err) {
      throw err;
    }

    console.log("사용자 데이터 추가");

    findeAll();
  });

  function findeAll() {
    UserModel.find({}, function (err, results) {
      if (err) {
        throw err;
      }

      if (results) {
        console.log(
          "조회된 user 문서 객체 #0 -> id : %s, name : %s",
          results[0]._doc.id,
          results[0]._doc.name
        );
      }
    });
  }

  console.log("info 속성에 값 할당");
  console.log("id : %s, name : %s", user.id, user.name);
}

const authUser = function (database, id, password, callback) {
  console.log("authUser 호출됨");

  UserModel.findById(id, function (err, results) {
    if (err) {
      callback(err, null);
      return;
    }

    console.log("아이디가 [%s]와 일치하는 사용자 찾기.", id);
    console.dir(results);

    if (results.length > 0) {
      console.log("일치하는 사용자 찾음");
      const user = new UserModel({ id: id });
      const authenticated = user.authenticate(
        password,
        results[0]._doc.salt,
        result[0]._doc.hashed_password
      );

      if (authenticated) {
        console.log("비밀번호가 일치함");
        callback(null, results);
      } else {
        console.log("비밀번호가 일치하지 않음");
        callback(null, null);
      }
    } else {
      console.log("일치하는 사용자를 찾지 못함.");
      callback(null, null);
    }
  });
};

router.route("/process/listuser").post(function (req, res) {
  console.log("/process/listuser 호출됨");

  if (database) {
    UserModel.findAll(function (err, results) {
      if (err) {
        console.log("사용자 리스트 조회 중 오류 발생 : " + err.stack);

        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h2>사용자 리스트 조회 중 오류 발생</h2>");
        res.write("<p>" + err.stack + "</p>");
        res.end();

        return;
      }

      if (results) {
        console.dir(results.length);

        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h2>사용자 리스트</h2>");
        res.write("<div><ul>");

        for (let i = 0; i < results.length; i++) {
          let curId = results[i]._doc.id;
          let curName = results[i]._doc.name;
          res.write(
            "     <li>#" + i + " : " + curId + ", " + curName + "</li>"
          );
        }

        res.write("</ul></div>");
        res.end();
      } else {
        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h2>사용자 리스트 조회 실패</h2>");
        res.end();
      }
    });
  } else {
    res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
    res.write("<h2>데이터베이스 연결 실패</h2>");
    res.end();
  }
});

const addUser = function (database, id, password, name, callback) {
  console.log("addUser 호출됨 : " + id + ", " + password + ", " + name);

  const user = new UserModel({ id: id, password: password, name: name });

  user.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }

    console.log("사용자 레코드 추가됨");

    callback(null, user);
  });
};

router.route("/process/adduser").post(function (req, res) {
  console.log("/process/adduser 호출됨");

  const paramId = req.body.id || req.query.id;
  const paramPw = req.body.password || req.query.password;
  const paramName = req.body.name || req.query.name;

  console.log("요청 파라미터 : " + paramId + ", " + paramPw + ", " + paramName);

  if (database) {
    addUser(database, paramId, paramPw, paramName, function (err, results) {
      if (err) {
        throw err;
      }
      res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
      res.write("<h2>사용자 추가 성공</h2>");
      res.end();
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
