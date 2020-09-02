console.log(
  "21. -------------------------------------------------------------"
);

const list = [1, 2, 2, 3, 4, 5, 5, 5, 6];

// set은 중복되지 않는 데이터를 저장하는 데이터구조

console.log(list);

let setVal = new Set(list);

console.log(setVal);
console.log("setVal.has(2)");
console.log(setVal.has(2));

console.log(
  "22. -------------------------------------------------------------"
);
const num22 = 24;
console.log("조건 : num22 % 6 === 0");
console.log(num22 % 6 === 0);

console.log(
  "23. -------------------------------------------------------------"
);

console.log(10 / 3); // 3.333333333....
console.log(Math.floor(10 / 3));

console.log(
  "24. -------------------------------------------------------------"
);

const string24 = "mary";

console.log(string24.toUpperCase());

console.log(
  "25. -------------------------------------------------------------"
);
function circle(radius) {
  return radius * radius * 3.14;
}

console.log(circle(4));

console.log(
  "26. -------------------------------------------------------------"
);

const planets = {
  수성: "Mercury",
  금성: "Venus",
  지구: "Earth",
  화성: "Mars",
  목성: "Jupiter",
  토성: "Saturn",
  천왕성: "Uranus",
  해왕성: "Neptune",
};
const inputPlanetName = "토성";
// const inputPlanetName = prompt();
console.log(planets[inputPlanetName]);

console.log(
  "27. -------------------------------------------------------------"
);

const name27 = ["Yujin", "Hyewon"];
const score27 = [70, 100];
const obj27 = {};

for (let i = 0; i < name27.length; i++) {
  obj27[name27[i]] = score27[i];
  // 오브젝트 접근할 때 대괄호 안에서 key값으로 접근, 입력 또한 같은 방식으로 한다
}

console.log(obj27);

console.log(
  "28. -------------------------------------------------------------"
);

//2-gram이란 문자열에서 2개의 연속된 요소를 출력하는 방법

const string28 = "Jst";

for (let i = 0; i < string28.length - 1; i++) {
  console.log(string28[i], string28[i + 1]);
}

console.log(
  "29. -------------------------------------------------------------"
);

const inputStr = "a";

if (inputStr === inputStr.toUpperCase()) console.log("YES");
else console.log("NO");

console.log(
  "30. -------------------------------------------------------------"
);

const inputStr30 = "pineapple is yummy";
const findStr30 = "apple";

console.log(inputStr30.indexOf(findStr30));

console.log(
  "31. -------------------------------------------------------------"
);

// 시간 복잡도란?
// O(1) = 메서드의 실행 시간이 항상 일정함

/* arr[i] : 원소에 접근하는 시간은 O(1)
   arr.push(5) : 단순히 배열에 넣기만 하는 메서드이기 때문에 O(1)
   arr.slice() : 인수가 많을수록 느려지므로 항상 일정하지 않다
   arr.pop() : 빼기만 하는 메서드 -> O(1)
   arr.includes(5) : 인수가 많을수록 느려지므로 항상 일정하지 않다
*/

console.log(
  "32. -------------------------------------------------------------"
);

const string32 = "안녕하세요. 저는 제주대학교 컴퓨터공학전공 혜림입니다.";

console.log(string32.split(" ").length);

console.log(
  "33. -------------------------------------------------------------"
);

const inputNums33 = "1 2 3 4 5";
const inputNums33_2 = "2 4 6 7 8";

const arr33 = inputNums33.split(" ").reverse();
const arr33_2 = inputNums33_2.split(" ").reverse();

function reverseArray(arr) {
  let reversArr = "";

  for (let i = 0; i < arr.length; i++) {
    reversArr += arr[i] + " ";
  }
  return reversArr;
}

console.log(reverseArray(arr33));
console.log(reverseArray(arr33_2));

console.log(
  "34. -------------------------------------------------------------"
);

const inputHeight = "176 156 155 165 166 169";
const inputHeight2 = "155 156 165 166 169 176";

function autoCheck(str) {
  const sortedHeight = inputHeight
    .split(" ")
    .sort(function (a, b) {
      return a - b;
    })
    .join(" ");
  // join() 메서드를 잘 사용해보자

  if (sortedHeight === str) console.log("YES");
  else console.log("NO");
}

autoCheck(inputHeight);
autoCheck(inputHeight2);

console.log(
  "35. -------------------------------------------------------------"
);

function one(n) {
  function two(x) {
    return Math.pow(x, n);
  }
  return two;
}

const num35_1 = one(2);
const num35_2 = one(3);
const num35_3 = one(4);

console.log(num35_1(10));
console.log(num35_2(10));
console.log(num35_3(10));

console.log(
  "36. -------------------------------------------------------------"
);

const inputNum36 = 6;

function gugudan(num) {
  result36 = "";

  for (let i = 1; i < 10; i++) {
    result36 += num * i + " ";
  }
  return result36;
}

console.log(gugudan(inputNum36));

console.log(
  "37. -------------------------------------------------------------"
);

const inputStr37 =
  "원범 원범 원범 원범 원범 원범 원범 원범 원범 원범 혜원 혜원 혜원 혜원 유진 유진";

const array37 = inputStr37.split(" ");

let result = {};
let winner = "";

for (let index in array37) {
  let val = array37[index];
  result[val] = result[val] === undefined ? 1 : (result[val] = result[val] + 1);
}

winner = Object.keys(result).reduce(function (a, b) {
  return result[a] > result[b] ? a : b;
});

console.log(`${winner}(이)가 총 ${result[winner]}표로 반장이 되었습니다.`);

console.log(
  "38. -------------------------------------------------------------"
);

const inputScore = "97 86 75 66 55 97 85 97 97 95";

const sortedScore = inputScore.split(" ").sort(function (a, b) {
  return a - b;
});

let score3rd = [];
let count = 0;

while (score3rd.length < 3) {
  let value = sortedScore.pop();
  if (!score3rd.includes(value)) {
    score3rd.push(value);
  }
  count++;
}

console.log(`총 ${count}명에게 사탕을 사주어야 합니다`);

console.log(
  "39. -------------------------------------------------------------"
);

inputStr39 = "querty";
inputStr39_2 = "hqllo my namq is hyqwon";

console.log(inputStr39_2.split("q").join("e"));

console.log(
  "40. -------------------------------------------------------------"
);

const limit = "50";
const number40 = "5";
const weight = ["20", "20", "20", "20", "20"];

function checkLimit(limit, numberOfPeople, weightArr) {
  let totalWeight = 0;
  let count = 0;
  for (let i = 0; i < parseInt(numberOfPeople); i++) {
    totalWeight += parseInt(weightArr[i]);

    if (totalWeight < parseInt(limit)) count++;
  }

  console.log(
    `무게제한이 ${limit}인 놀이기구에 ${numberOfPeople}명이 왔지만 ${count}명만 탈 수 있었습니다.`
  );
}

checkLimit(limit, number40, weight);
