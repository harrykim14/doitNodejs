console.log(
  "96. -------------------------------------------------------------"
);

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

function solution(revField) {
  const height = revField.length;
  const width = revField[0].length;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      revField[i][j] = parseInt(revField[i][j], 10);
    }
  }
  console.log(revField);
  let max = 0;
  let row = 0;
  let col = 0;
  for (let i = 1; i < height; i++) {
    for (let j = 1; j < width; j++) {
      if (revField[i][j] == 1) {
        let min;
        if (revField[i - 1][j] >= revField[i][j - 1]) {
          min = revField[i][j - 1];
        } else if (revField[i - 1][j] <= revField[i][j - 1]) {
          min = revField[i - 1][j];
        }
        if (min > revField[i - 1][j - 1]) {
          min = min = revField[i - 1][j - 1];
        }
        revField[i][j] = min + 1;
        if (max < revField[i][j]) {
          max = revField[i][j];
          row = i;
          col = j;
        }
      }
    }
  }
  console.log("%d x %d", max, max);
  console.log(row, col);

  for (let i = row - (max - 1); i < row + 1; i++) {
    for (let j = col - (max - 1); j < col + 1; j++) {
      revField[i][j] = "#";
    }
  }
  console.log(revField);
}
solution(revField);

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
