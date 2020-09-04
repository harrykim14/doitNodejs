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
