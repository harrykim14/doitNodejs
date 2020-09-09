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

console.log(
  "97. -------------------------------------------------------------"
);

function sol(worker, worktime) {
  let answer = 0;
  let man = Array(worker).fill(0);
  //   console.log(man);

  while (worktime.length !== 0) {
    // 택배 상차과정
    for (let j = 0; j < man.length; j++) {
      if (man[j] == 0 && worktime) {
        man[j] += worktime.shift();
        // console.log(worktime);
      }
    }

    // 시간 경과
    man = man.map((time) => {
      return (time = time - 1);
    });
    // map 한 값을 다시 map에 저장해줘야 무한루프에서 벗어날 수 있다

    // 시간이 경과했으므로 ++;
    answer++;
  }
  answer += Math.max.apply(null, man);
  return answer;
}

const worker = 3;
const worktime = [1, 2, 1, 3, 3, 3];
console.log("총 경과시간 = %d초", sol(worker, worktime));

console.log(
  "98. -------------------------------------------------------------"
);
let input = "1번: 4,2,3 2번: 3 3번: 2,3,4,1 4번: 2,3";
let input2 = "1번: 3,1 2번: 4 3번: 2,1,3 4번: 2,1,3,4";
function uniqueValues(input) {
  input = input.split(" ");
  let score = [];
  for (let idx in input) {
    if (idx % 2 !== 0) score.push(input[idx].split(","));
  }
  console.log(score);
  let uniqueScore = [];
  score.map((row) => {
    row.map((x) => {
      // console.log(x);
      if (!uniqueScore.includes(x)) {
        uniqueScore.push(x);
      }
    });
  });
  return uniqueScore;
}
console.log(uniqueValues(input));
console.log(uniqueValues(input2));

console.log(
  "99. -------------------------------------------------------------"
);

// const durable = [1, 2, 1, 4];
// const jumpable = [2, 1];
const durable = [1, 2, 1, 4, 5, 2];
const jumpable = [2, 1, 3, 1];
let pass = [];
console.log(pass);
for (let rabbit of jumpable) {
  let iterNum = Math.floor(durable.length / rabbit);
  //   console.log(iterNum);
  for (let i = 1; i < iterNum + 1; i++) {
    durable[rabbit * i - 1] -= 1;
  }
  console.log(durable);
  if (!durable.includes(-1)) pass.push("pass");
  else pass.push("fail");
}
console.log(pass);

console.log(
  "100. -------------------------------------------------------------"
);

let puzzle = [
  [0, 0, 0, 0],
  [0, 1, 0, 3],
  [2, 5, 0, 1],
  [2, 4, 4, 1],
  [5, 1, 1, 1],
];
const control = [1, 1, 1, 1, 3, 3, 3];

let stack = [];
let score = 0;

for (let move of control) {
  // 숫자에 맞는 공을 스택에 쌓고 해당 위치는 0으로 초기화하기
  for (let idx = 0; idx < puzzle.length; idx++) {
    if (puzzle[idx][move - 1] > 0) {
      stack.push(puzzle[idx][move - 1]);

      // 연속된 공이라면 스코어를 곱연산으로 처리하고 더하기
      if (stack.length > 1) {
        for (let i = 0; i < stack.length - 1; i++) {
          if (stack[i] === stack[i + 1]) {
            score += stack[i] * stack[i + 1];
            console.log(
              "같은 공이 들어왔어요! %d의 점수를 추가합니다",
              stack[i] * stack[i + 1]
            );
            console.log("현재 스코어 : %d", score);
            stack = [];
          }
        }
      }
      puzzle[idx][move - 1] = 0;
      break;
    }

    // 판 내에 원하는 줄에 공이 있는지 확인
    if (puzzle[idx][move - 1] === 0 && idx === 4) {
      score -= 1;
      console.log("빈 공간에서 공을 꺼낼 수 없습니다 점수를 -1만큼 차감합니다");
    }
    // console.log("현재 스코어 : %d", score);
  }
}
console.log(stack);
console.log(score);
