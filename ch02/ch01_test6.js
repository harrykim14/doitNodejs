process.on("exit", function () {
  console.log("exit event");
});
// 이벤트를 받기위한 메소드

setTimeout(function () {
  console.log("2초 후에 실행되었음");

  process.exit();
}, 2000);

console.log("2초 후에 실행될 것임");
