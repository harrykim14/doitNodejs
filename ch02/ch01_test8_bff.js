const fs = require("fs");
/*
    플래그는 'r', 'w', 'w+', 'a+'의 네가지가 있다
    'r' : 읽기에 사용하는 플래그, 파일이 없으면 예외로 던짐
    'w' : 쓰기에 사용하는 플래그, 파일이 없으면 만들고 있으면 이전 내용을 전부 삭제함
    'w+' : 읽기쓰기에 모두 사용, 파일이 없으면 만들고 파일이 있으면 이전 내용을 삭제함
    'a+' : 읽기쓰기에 모두 사용, 파일이 없으면 만들어지고 있으면 이전 내용에 새로운 내용을 추가함
*/
fs.open("./output.txt", "r", function (err, fd) {
  if (err) throw err;

  const buf = new Buffer(20);

  console.log("버퍼 타입 : %s", Buffer.isBuffer(buf));

  fs.read(fd, buf, 0, buf.length, null, function (err, bytesRead, buffer) {
    if (err) throw err;
    const inStr = buffer.toString("utf8", 0, bytesRead);
    console.log("파일에서 읽은 데이터 : %s", inStr);

    console.log(err, bytesRead, buffer);

    fs.close(fd, function () {
      console.log("output.txt 파일을 열고 읽기 완료.");
    });
  });
});
