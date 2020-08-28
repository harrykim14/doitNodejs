/*
    Node.js란?
    자바스크립트를 사용하여 웹 브라우저에 JVM과 같이 런타임 환경을 제공하는 언어
*/

console.log("Hello Node.js!");
console.log("숫자 보여주기 : %d", 10);
console.log("문자열 보여주기 : %s", "Node.js");
console.log("JSON 객체 출력 : %j", {
  name: "Node.js",
  year: 2009,
  version: "v12",
});

function first() {
  second();
  console.log("첫번째 함수");
}

function second() {
  third();
  console.log("두번째 함수");
}

function third() {
  console.log("세번째 함수");
}

first();
// node.js는 Last In First Out (LIFO) 스택 구조로 실행된다

console.time("How much time did this take?");
function addNumbers() {
  let num = 0;
  for (let i = 0; i <= 10000; i++) {
    num += i;
  }
  console.log(num);
}
addNumbers();
console.timeEnd("How much time did this take?");

console.log("현재 실행한 파일 이름 : %s", __filename);
console.log("현재 실행한 디렉토리 : %s", __dirname);
