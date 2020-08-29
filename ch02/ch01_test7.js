const fs = require("fs");

const data = fs.readFileSync("./package.json", "utf8", function (err, data) {
  console.log(data);
});

console.log("프로젝트 폴더 내의 package.json 파일을 읽도록 요청했습니다.");
//console.log(data);
fs.writeFile("./output.txt", "Hello World!", function (err) {
  if (err) {
    console.log("Error : " + err);
  }
  console.log("output.txt 파일에 데이터 쓰기 완료.");
});

fs.open("./output.txt", "w", function (err, fd) {
  if (err) throw err;

  const buf = new Buffer("안녕!\n");
  fs.write(fd, buf, 0, buf.length, null, function (err, written, buffer) {
    if (err) throw err;

    console.log(err, written, buffer);

    fs.close(fd, function () {
      console.log("파일 열고 닫기 완료");
    });
  });
});
