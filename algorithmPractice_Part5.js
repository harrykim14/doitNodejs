console.log(
  "61. -------------------------------------------------------------"
);

const inputStr61 = "aaabbbcdddd";

let resultStr61 = "";
let storeStr61 = inputStr61[0];
let count61 = 0;

for (let i of inputStr61) {
  if (i === storeStr61) {
    count61 += 1;
  } else {
    resultStr61 += storeStr61 + String(count61);
    storeStr61 = i;
    count61 = 1;
  }
}
resultStr61 += storeStr61 + String(count61);

console.log(resultStr61);

console.log(
  "62. -------------------------------------------------------------"
);
//abcdefgh
//20190923
const inputStr62 = "aacdddddddddfffffffffgghhh";
let resultStr62 = "";

console.log(
  `${inputStr62.match(/a/g).length}${Number(inputStr62.match(/b/g))}${
    inputStr62.match(/c/g).length
  }${inputStr62.match(/d/g).length}${Number(inputStr62.match(/e/g))}${
    inputStr62.match(/f/g).length
  }${inputStr62.match(/g/g).length}${inputStr62.match(/h/g).length}`
);

console.log(
  "63. -------------------------------------------------------------"
);

const inputStr63 = "복잡한 세상 편하게 살자";

const resultStr63 = inputStr63
  .split(" ")
  .map((s) => {
    return s[0];
  })
  .join("");

console.log(resultStr63);

// for (let s for inputStr63.split(' ')){
// console.log(s.slice(0,1));
// result63 += s[0]
//}

console.log(
  "64. -------------------------------------------------------------"
);

let limit = 85;
let result64 = 0;
let count7 = 0;
let count3 = 0;

while (true) {
  if (limit % 7 == 0) {
    result64 += parseInt(limit / 7, 10);
    count7 = parseInt(limit / 7, 10);
    console.log(result64);
    break;
  }
  limit -= 3;
  result64 += 1;
  count3++;
  if (limit < 0) {
    console.log(-1);
    break;
  }
}

console.log("7kg :" + count7 + ", 3kg : " + count3);

console.log(
  "65. -------------------------------------------------------------"
);

const arr1 = [1, 2, 3, 4];
const arr2 = ["a", "b", "c", "d"];
// const resultArr65 = [];
// for (let i = 0; i < arr1.length; i++) {
//   resultArr65.push([arr1[i], arr2[i]]);
// }
// console.log(resultArr65);
let arr3 = arr1.map((e, index) => {
  if (index % 2 === 0) return [index, arr2[index]];
  else return [arr2[index], index];
});
console.log(arr3);

console.log(
  "66. -------------------------------------------------------------"
);
const allBlocks = ["ABCDEF", "BCAD", "ADEQRX", "BEDFG", "EFGHZ"];
const rule = "ABD";

function solution(allBlocks, rule) {
  let answer = [];
  for (let block of allBlocks) {
    answer.push(checkBlock(block, rule));
  }
  return answer;
}

function checkBlock(block, rule) {
  let temp = rule.indexOf(rule[0]);
  for (let char of block) {
    if (rule.includes(char)) {
      if (temp > rule.indexOf(char)) {
        return "불가능";
      }
      temp = rule.indexOf(char);
    }
  }
  return "가능";
}
console.log(solution(allBlocks, rule));

console.log(
  "67. -------------------------------------------------------------"
);

function solution2(n) {
  let person = 0;
  let handshakeNum = 0;
  let temp = 0;
  while (true) {
    handshakeNum = parseInt((person * (person - 1)) / 2, 10);
    if (n < handshakeNum) {
      break;
    }
    temp = handshakeNum;
    person += 1;
  }
  return [parseInt(n - temp), person];
}

const handshake = 59;
console.log(solution2(handshake));

console.log(
  "68. -------------------------------------------------------------"
);

const busSchedule = ["12:30", "13:20", "14:13"];
const inputTime = "12:40";

const time2num = busSchedule.map((t) => {
  return parseInt(t.split(":").join(""));
});
const inputTime2num = parseInt(inputTime.split(":").join(""));
const remainTime = [];

for (time of time2num) {
  if (time - inputTime2num < 0) {
    remainTime.push("지나갔습니다.");
  } else {
    remainTime.push(Math.abs(time - inputTime2num));
  }
}
// console.log(remainTime);

const remainTime2Str = remainTime.map((t) => {
  if (!isNaN(t)) {
    let hour = Math.floor(t / 60);
    let min = Math.floor(t % 60);
    return `${hour < 10 ? "0" + hour : hour}시간 ${
      min < 10 ? "0" + min : min
    }분`;
  } else {
    return t;
  }
});

console.log(remainTime2Str);

console.log(
  "69. -------------------------------------------------------------"
);

function primeList(n) {
  let sieve = [];
  for (let i = 2; i < n; i++) {
    sieve.push(true);
  }

  let m = parseInt(n ** 0.5, 10);

  for (let i = 2; i < m + 1; i++) {
    if (sieve[i] == true) {
      for (let j = i * i; j < n; j += i) {
        sieve[j] = false;
      }
    }
  }

  let prime = [];
  for (let i = 2; i < n; i++) {
    if (sieve[i] == true) {
      prime.push(i);
    }
  }
  return prime;
}

// let prime = [];
// let primeCheck = true;

// for (let i = 2; i < 100; i++) {
//   for (let j = 2; j < i; j++) {
//     if (i % j == 0) {
//       primeCheck = false;
//     }
//   }
//   if (primeCheck) {
//     prime.push(i);
//   }
//   primeCheck = true;
// }
// console.log(prime);

// let count69 = 0;
// const inputNumber = 100;
// let goldbachArr = [];
// for (let n of prime) {
//   if (prime.include(inputNumber - n)) {
//     console.log(n, inputNumber - n);
//   }
//   if (count69 > parseInt(prime.length / 2, 10)) {
//     break;
//   }
//   count69++;
// }

function goldbachNum(num) {
  const nPrimeList = primeList(num + 1);

  let count69 = 0;
  let goldbachArr = [];
  for (let n of nPrimeList) {
    if (nPrimeList.includes(num - n)) {
      goldbachArr.push([n, num - n]);
    }
    if (count69 > parseInt(nPrimeList.length / 2, 10)) {
      console.log(n, num - n);
      break;
    }
    count69++;
  }
}

goldbachNum(10000);

console.log(
  "70. -------------------------------------------------------------"
);

const matrix1 = [
  [1, 2],
  [2, 4],
];
const matrix2 = [
  [1, 0],
  [0, 3],
];

function solution3(a, b) {
  let c = [];
  // 만들어질 행렬을 초기화
  const len = a[0].length;
  // 행렬 연산 기준이 될 행렬의 길이를 먼저 구함
  if (len == b.length) {
    // 행렬 연산은 기준 행렬의 행, 곱할 열이 같아야 가능
    for (let i = 0; i < len; i++) {
      let row = [];
      for (let j = 0; j < len; j++) {
        let x = 0;
        for (let k = 0; k < len; k++) {
          x += a[i][k] * b[k][j];
          // i = 0 번째 루프
          // a[0][0] * b[0][0] + a[0][1] * b[1][0];
          // a[0][1] * b[1][0] + a[0][1] * b[1][1];
        }
        row.push(x);
        // 행 연산(각 a[i] 관련 연산)이 여기서 끝나니까 push 해 주기
      }
      c.push(row);
      // 연산이 완료된 row를 push
    }
  } else {
    return -1;
  }
  return c;
}

const newMatrix = solution3(matrix1, matrix2);
console.log(newMatrix);
