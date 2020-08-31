const express = require("express"),
  http = require("http"),
  path = require("path"),
  bodyParse = require("body-parser"),
  cookieParse = require("cookie-parser"),
  static = require("serve-static"),
  errorHandler = require("errorhandler"),
  expressErrorHandler = require("express-error-handler"),
  expressSession = require("express-session");

// multipart 불러오기
const multer = require("multer"),
  fs = require("fs");

// 클라이언트에서 ajax로 요청했을 때 CORS(다중 서버 접속) 지원
const cors = require("cors");

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json);
app.use("/public", static(path.join(__dirname, "public")));
app.use("/uploads", static(path.join(__dirname, "uploads")));

app.use(cookieParse());

app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + Date.now());
  },
});

const upload = multer({
  storage: storage,
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024,
  },
});

const router = express.Router();

router
  .route("/process/photo")
  .post(upload.array("photo", 1), function (req, res) {
    console.log("/process/photo 호출됨.");

    try {
      const files = req.files;
      console.dir("#===== 업로드된 첫번째 파일 정보 =====#");
      console.dir(req.files[0]);
      console.dir("#=====#");

      const originalname = "",
        filename = "",
        mimetype = "",
        size = 0;

      if (Array.isArray(files)) {
        console.log("배열에 들어있는 파일 갯수 : %d", files.length);

        for (let index = 0; index < files.length; index++) {
          originalname = files[index].originalname;
          filename = files[index].filename;
          mimetype = files[index].mimetype;
          size = files[index].size;
        }
      } else {
        console.log("파일 갯수 : 1");

        originalname = files[index].originalname;
        filename = files[index].filename;
        mimetype = files[index].mimetype;
        size = files[index].size;
      }

      console.log(
        "현재 파일 정보 : " +
          originalname +
          ", " +
          filename +
          ", " +
          mimetype +
          ", ",
        +size
      );

      res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
      res.write("<h3>파일 업로드 성공</h3><hr/>");
      res.write(
        "<p>원본 파일 이름 : " +
          originalname +
          " -> 저장 파일명 : " +
          filename +
          "</p>"
      );
      res.write("<p>MIME TYPE : " + mimetype + "</p>");
      res.write("<p>파일 크기 : " + size + "</p>");
      res.end();
    } catch (err) {
      console.dir(err.stack);
    }
  });

app.use("/", router);

const errorhandle = expressErrorHandler({
  static: {
    404: "./public/404.html",
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get("port"), function () {
  console.log("익스프레스 서버를 시작했습니다 : " + app.get("port"));
});
