process.on("tick", function (count) {
  console.log("tick event processed" + count);
});
// 이벤트를 받기위한 메소드

setTimeout(function () {
  console.log("2초 후에 실행되었음");

  process.emit("tick", "2");
}, 2000);
