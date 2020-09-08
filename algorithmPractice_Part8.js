const { SSL_OP_ALL } = require("constants");

console.log(
  "91. -------------------------------------------------------------"
);

let subjectNum = 5;
let studentNum = 30;
let classNum = 7;

let schoolScore = [];

for (let k = 0; k < classNum; k++) {
  let classScore = [];
  for (let i = 0; i < studentNum; i++) {
    let scoreArr = [];
    for (let j = 0; j < subjectNum; j++) {
      scoreArr.push(Math.floor(Math.random() * 100) + 1);
    }
    classScore.push(scoreArr);
  }
  schoolScore.push(classScore);
}
console.log("전교생 점수");
console.log(schoolScore);

let classAverage = [];

for (let eachClass of schoolScore) {
  let sumScore = 0;
  for (let eachStudent of eachClass) {
    for (let eachSubject of eachStudent) {
      sumScore += eachSubject;
    }
  }
  classAverage.push(sumScore / 5 / 30);
}
console.log("반평균");
console.log(classAverage);

let classMaxScore = [];
let totalScore = 0;
let sortedScore = schoolScore.map((each) => {
  let studentMaxScore = [];
  each.map((deep) => {
    let eachStudentTotal = deep.reduce((acc, val) => {
      return acc + val;
    });
    studentMaxScore.push(eachStudentTotal);
    totalScore += eachStudentTotal;
  });
  classMaxScore.push(Math.max.apply(null, studentMaxScore));
});
console.log("반별 1등 점수");
console.log(classMaxScore);

console.log("전교 평균");
console.log(totalScore / 1050);

console.log(
  "92. -------------------------------------------------------------"
);
const input = `이대표, "333,356,766", "S은행", "100-0000-0000-001"
최차장, "5,000,000", "S은행", "100-0000-0000-002"
이과장, "3,200,000", "S은행", "100-0000-0000-003"
홍팀장, "3,300,000", "S은행", "100-0000-0000-004"
이대리, "5,300,000", "S은행", "100-0000-0000-005"`;

console.log();
let employee = input.split("\n");
let salaryArr = [];
for (let each of employee) {
  let split = each.split(",");
  let salary = split
    .slice(1, split.length - 2)
    .join("")
    .split('"');
  salaryArr.push(salary[1]);
}
console.log(salaryArr);
let dividedSalary = [];
for (let eachSal of salaryArr) {
  let sal1 = "";
  let sal2 = "";

  for (let digit of eachSal) {
    if (digit === "3") {
      sal1 += "2";
      sal2 += "1";
    } else if (digit === "4") {
      sal1 += "2";
      sal2 += "2";
    } else if (digit === "6") {
      sal1 += "1";
      sal2 += "5";
    } else {
      sal1 += digit;
      sal2 += "0";
    }
  }
  dividedSalary.push([parseInt(sal1, 10), parseInt(sal2, 10)]);
}
console.log(dividedSalary);

console.log(
  "93. -------------------------------------------------------------"
);

function pageChange(frame, page) {
  let runTime = 0;
  let temp = [];

  if (frame === 0) {
    runTime = page.length * 6;
    return runTime;
  }
  for (let i of page) {
    if (temp.includes(i)) {
      runTime += 1;
    } else {
      if (temp.length < frame) {
        temp.push(i);
      } else {
        temp.shift();
        temp.push(i);
      }
      runTime += 6;
    }
  }
  return runTime;
}

const f = 4;
const page = "ABCDABEABCDE".split("");

console.log(pageChange(f, page));

/*
pageArr = [B]; // 1번째, B, 6초
pageArr = [B,C]; // 2번째, C, 6초
pageArr = [B,C]; // 3번째, B, 1초
pageArr = [B,C,A]; // 4번째, A, 6초
pageArr = [C,A,E]; // 5번째, E, 6초
pageArr = [A,E,B]; // 6번째, B, 6초
pageArr = [E,B,C]; // 7번째, C, 6초
pageArr = [E,B,C]; // 8번째, E, 1초
*/

console.log(
  "94. -------------------------------------------------------------"
);

/*
BCBAEBCE
B 6
BC 6
CB 1
CBA 6
BAE 6
AEB 1
EBC 6 
BCE 1
*/
function pageChange(frame, page) {
  let runTime = 0;
  let temp = [];

  if (frame === 0) {
    runTime = page.length * 6;
    return runTime;
  }
  for (let i of page) {
    if (temp.includes(i)) {
      runTime += 1;
      temp.push(temp.shift());
    } else {
      if (temp.length < frame) {
        temp.push(i);
      } else {
        temp.shift();
        temp.push(i);
      }
      runTime += 6;
    }
  }
  return runTime;
}

const frame = 3;
const LRUpage = "BCBAEBCE".split("");

console.log(pageChange(frame, LRUpage));

console.log(
  "95. -------------------------------------------------------------"
);
let stamp = [
  [1, 1, 1, 2],
  [2, 0, 0, 0],
  [1, 1, 1, 1],
  [0, 0, 0, 0],
];
let turn = 1;

function turnStamp(stamp, turn) {
  let N = stamp.length;
  let p = [];

  for (let i = 0; i < N; i++) {
    p.push(Array(N).fill(0));
  }

  p = sum_matrix(p, stamp);

  for (let i = 0; i < turn; i++) {
    stamp = rotate(stamp);
    p = sum_matrix(p, stamp);
  }

  console.log(p);
}

function rotate(stamp) {
  let l = stamp.length;
  let rotStamp = [];

  for (let i = 0; i < l; i++) {
    rotStamp.push(Array(l).fill(0));
  }
  for (let i = 0; i < l; i++) {
    for (let j = 0; j < l; j++) {
      rotStamp[j][l - i - 1] = stamp[i][j];
    }
  }
  return rotStamp;
}

function sum_matrix(p, stamp) {
  let l = stamp.length;
  for (let i = 0; i < l; i++) {
    for (let j = 0; j < l; j++) {
      p[i][j] += stamp[i][j];
    }
  }
  return p;
}
turnStamp(stamp, turn);
/* 
    i, j -> j, i.length-1-i;
    0,0 -> 0,3;
    0,1 -> 1,3;
    0,2 -> 2,3;
    0,3 -> 3,3;

    1,0 -> 0,2;
    1,1 -> 1,2;
    1,2 -> 2,2;
    1,3 -> 3,2;
    
    2,0 -> 0,1;
    2,1 -> 1,1;
    2,2 -> 2,1;
    2,3 -> 3,1;

    3,0 -> 0,0;
    3,1 -> 1,0;
    3,2 -> 2,0;
    3,3 -> 3,0;
*/
console.log(
  "96. -------------------------------------------------------------"
);

const field = [
  [0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 0],
];

let orgField = `0 0 0 0 0
0 1 0 0 0
0 1 0 0 0
0 0 1 0 0
0 0 0 1 0`
  .replace(/1/g, "!")
  .replace(/0/g, "1")
  .replace(/!/g, "0");
// console.log(orgField);
let revField = [];
for (let row of orgField.split("\n")) {
  revField.push(row.split(" "));
}
console.log(revField);

/*
재귀함수 : 중복의 가능성이 있으며 탑다운 방식
Memoization : 탑다운 방식 
DP(Dynamic Programming) : 바텀업, 중복 하지 않음
*/
// let N = 30;
// let memo = Array(N + 1).fill(0);

// function dp(n) {
//   if (n === 1 || n === 2) {
//     memo[n] = 1;
//     return 1;
//   } else if (memo[n] !== 0) {
//     return memo[n];
//   } else {
//     memo[n] = dp(n - 1) + dp(n - 2);
//     return memo[n];
//   }
// }

// console.log(dp(N));

//

// let cache = Array(num+1).fill(0);
// function factorial(n) {
//   if (n < 2) {
//     return 1;
//   } else {
//     return factorial(n - 1) * n;
//   }
// }
// console.log(factorial(5));

// let answer = [];
// answer[1] = 1;
// answer[2] = 1;
// for (let i = 3; i < 8; i++) {
//   answer[i] = answer[i - 2] + answer[i - 1];
// }
// console.log(answer);
