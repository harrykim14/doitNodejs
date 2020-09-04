console.log(
  "50. -------------------------------------------------------------"
);

function bubble(arr) {
  let result50 = arr.slice();

  for (let i = 0; i < result50.length - 1; i++) {
    for (let j = 0; j < result50.length - i; j++) {
      if (result50[j] > result50[j + 1]) {
        let tempNum = result50[j];
        result50[j] = result50[j + 1];
        result50[j + 1] = tempNum;
      }
    }
  }
  return result50;
}

const items = "5 4 7 9 1 3".split(" ").map((n) => {
  return parseInt(n, 10);
});

console.log(bubble(items));

console.log(
  "51. -------------------------------------------------------------"
);

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let result = [];

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}

const arr51 = "1 5 7 9 4 3 8 2".split(" ").map((n) => parseInt(n));

console.log(mergeSort(arr51));

console.log(
  "52. -------------------------------------------------------------"
);

function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  // 퀵소트에서는 기준이 되는 피벗값을 두고 비교하여 좌우로 나눠 정렬함
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(pivot, quickSort(right));
}

const arr52 = [1, 3, 2, 7, 5, 6, 4, 8, 9, 10];
console.log(arr52);
console.log(quickSort(arr52));

console.log(
  "53. -------------------------------------------------------------"
);
// 1. (())
// 2. (((()()()()))
// 3. ()()()
// 4. )))((( X
// 5.())     X
// 6.())(    X

function bracketsCheck(arr) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "(") {
      count++;
    }
    if (arr[i] === ")") {
      count--;
    }
  }

  if (count !== 0) {
    return false;
  }

  let bracket = [];

  for (let i in arr) {
    if (arr[i] === "(") {
      bracket.push("(");
    }
    if (arr[i] === ")") {
      if (bracket.length === 0) {
        return false;
      }
      bracket.pop();
    }
    return true;
  }
}

const n = "((()))".split("");
console.log(bracketsCheck(n));

console.log(
  "54. -------------------------------------------------------------"
);

function solution(arr) {
  arr.sort((a, b) => {
    return a - b;
  });
  for (let i = 0; i <= arr.length - 1; i++) {
    if (arr[i] + 1 !== arr[i + 1]) return "No";
    else return "Yes";
  }
}

const inputArr54 = "1 3 4 2 5 6".split(" ").map((a) => {
  return parseInt(a);
});
console.log(solution(inputArr54));

console.log(
  "55. -------------------------------------------------------------"
);

const route = [];

function hanoi(원반수, 시작기둥, 목표기둥, 보조기둥) {
  //원판이 하나면 바로 옮기면 됨
  if (원반수 === 1) {
    route.push([시작기둥, 목표기둥]);
    return 1;
  }

  //원반 n-1개를 보조로 옮김
  hanoi(원반수 - 1, 시작기둥, 보조기둥, 목표기둥);
  //console.log("원반 n-1개를 %d로 옮김", 보조기둥);

  // 가장 큰 원반은 목표기둥으로
  route.push([시작기둥, 목표기둥]);
  // console.log("가장 큰 원반은 %d에서 %d로", 시작기둥, 목표기둥);

  //경유기둥과 시작기둥을 바꿈
  hanoi(원반수 - 1, 보조기둥, 목표기둥, 시작기둥);
  // console.log("%d과 %d을 바꿈", 보조기둥, 시작기둥);
}

hanoi(4, 1, 2, 3);

console.log(
  "56. -------------------------------------------------------------"
);

const nationWidth = {
  Korea: 220877,
  Rusia: 17098242,
  China: 9596961,
  France: 543965,
  Japan: 377915,
  England: 242900,
};

const w = nationWidth["Korea"];
delete nationWidth["Korea"];
console.log(nationWidth);

const entry = Object.entries(nationWidth);
console.log(entry);

const values = Object.values(nationWidth);
console.log(values);

// 비교할 값 저장하기
let gap = Math.max.apply(null, values);
console.log(gap);
let item = [];

for (let i in entry) {
  if (gap > Math.abs(entry[i][1] - w)) {
    gap = Math.abs(entry[i][1] - w);
    item = entry[i];
  }
}

console.log(item[0], item[1] - w);

console.log(
  "57. -------------------------------------------------------------"
);

let s = "";
for (let i = 0; i < 1000; i++) {
  s += i;
}

let count = 0;
for (let k in s) {
  //   if (k == 1) count++;
  // for of 일 때
  if (s[k] == 1) count++;
  // for in 일 때
}

console.log(count);

console.log(
  "58. -------------------------------------------------------------"
);

const num58 = 10000000000000;
let arr58 = [];
function comma(n) {
  const num2str = n.toString();
  if (num2str.length < 4) {
    rtnString = num2str + "," + arr58.reverse().join(",");
    return console.log(rtnString);
  } else {
    arr58.push(num2str.slice(num2str.length - 3, num2str.length));
    comma(num2str.slice(0, num2str.length - 3));
  }
}

comma(num58);

console.log(
  "59. -------------------------------------------------------------"
);

const inputStr59 = "hi";

const strLeft = 25 - parseInt(inputStr59.length / 2, 10);

const left = inputStr59.padStart(strLeft, "=");
const right = left.padEnd(50, "=");

console.log(right);
console.log(right.length);

console.log(
  "60. -------------------------------------------------------------"
);
students = [
  "강은지",
  "김유정",
  "박현서",
  "최성훈",
  "홍유진",
  "박지호",
  "권윤일",
  "김채리",
  "한지호",
  "김진이",
  "김민호",
  "강채연",
];
students.sort();
studentObj = {};
for (let key in students) {
  console.log(`번호 : ${parseInt(key, 10) + 1}, 이름 : ${students[key]}`);
}
