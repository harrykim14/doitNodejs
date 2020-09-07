const { match } = require("assert");

console.log(
  "71. -------------------------------------------------------------"
);

const depthGraph = {
  A: ["E", "C", "B"],
  B: ["A"],
  C: ["A"],
  D: ["E", "F"],
  E: ["D", "A"],
  F: ["D"],
};

function dfsdepth(depthGraph, start) {
  let visited = [];
  let stack = [start];

  while (stack.length != 0) {
    let n = stack.pop();
    if (!visited.includes(n)) {
      visited.push(n);
      let sub = depthGraph[n].filter((x) => !visited.includes(x));
      for (let i of sub) {
        stack.push(i);
      }
    }
  }
  return visited;
}

console.log(dfsdepth(depthGraph, "E"));

console.log(
  "72. -------------------------------------------------------------"
);

const widthGraph = {
  A: ["E", "C", "B"],
  B: ["A"],
  C: ["A"],
  D: ["E", "F"],
  E: ["D", "A"],
  F: ["D"],
};

function dfswidth(widthGraph, start) {
  let visited = [];
  let queue = [start];

  while (queue.length != 0) {
    let n = queue.shift();
    console.log("큐에서 값을 shift(첫번째 값;여기서는 첫번째 노드;을 뺌)");
    console.log(n);
    if (!visited.includes(n)) {
      visited.push(n);
      let sub = widthGraph[n].filter((x) => !visited.includes(x));
      console.log("큐에서 뺀 n 값을 탐색 완료 배열에 푸쉬");
      console.log(visited);
      console.log(
        "n값에 해당되는 하위 노드를 탐색하되 완료 배열에 없을 때만 큐에 푸쉬함"
      );
      for (let i of sub) {
        queue.push(i);
      }
      console.log(sub);
    }
  }
  return visited;
}

console.log(dfswidth(widthGraph, "E"));

console.log(
  "73. -------------------------------------------------------------"
);

//최단거리를 구할 땐 스택을 사용하는 깊이우선 탐색을 사용하자

let minGraph = {
  A: ["B", "C"],
  B: ["A", "D", "E"],
  C: ["A", "F"],
  D: ["B"],
  E: ["B", "F"],
  F: ["C", "E"],
};

function minSolution(input) {
  const user_input = input.split(" ").map((s) => {
    return s.toUpperCase();
  });

  const start = user_input[0];
  const end = user_input[1];

  let minQueue = [start];
  let minVisited = [start];

  let count = -1;

  while (minQueue.length !== 0) {
    count++;
    let size = minQueue.length;
    for (let i = 0; i < size; i++) {
      let node = minQueue.splice(0, 1);
      if (node == end) {
        return count;
      }
      for (let next_node in minGraph[node]) {
        if (!minVisited.includes(minGraph[node][next_node])) {
          minVisited.push(minGraph[node][next_node]);
          minQueue.push(minGraph[node][next_node]);
        }
      }
    }
  }
}

console.log(minSolution("a f"));

console.log(
  "74. -------------------------------------------------------------"
);

// 최장거리를 구할 땐 큐를 사용하는 너비우선 탐색을 사용하기

const maxGraph = {
  1: [2, 3, 4],
  2: [1, 3, 4, 5, 6],
  3: [1, 2, 7],
  4: [1, 2, 5, 6],
  5: [2, 4, 6, 7],
  6: [2, 4, 5, 7],
  7: [3, 5, 6],
};

const inputMax = [1, 7];
const start = parseInt(inputMax[0], 10);
console.log("start : %d", start);
const end = parseInt(inputMax[1], 10);
console.log("end : %d", end);

let maxQueue = [start];
let visited = [];

function maxSolution(n, visited) {
  let node = n[n.length - 1];
  //   console.log("node : %d", node);
  let length = 0;

  if (node == end) {
    return visited.length;
  }

  if (visited.includes(node)) {
    return visited.length;
  } else {
    visited.push(node);
  }

  let max = [];

  for (let next_node in maxGraph[node]) {
    n.push(maxGraph[node][next_node]);
    max.push(length, maxSolution(n, visited));
    length = Math.max.apply(null, max);

    maxQueue.pop();
  }

  return length;
}

console.log(maxSolution(maxQueue, visited));

console.log(
  "75. -------------------------------------------------------------"
);

const rule = { 3: [3, 6, 9], 6: [3, 6, 9], 9: [3, 6, 9] };

function sol(n) {
  let answer = 0;
  let count = 1;
  const obj = { 3: 1, 6: 2, 9: 3 };

  while (n.length !== 0) {
    answer += obj[parseInt(n.pop(), 10)] * count;
    count *= 3;
  }

  return answer;
}

const inputNum = "663".split("").map((n) => {
  return parseInt(n, 10);
});
console.log(sol(inputNum));

console.log(
  "76. -------------------------------------------------------------"
);

let squareWidth = 5;
let place2search = 3;

let bomb = [
  [1, 0, 0, 1, 0],
  [0, 1, 0, 0, 1],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0],
];
let iadd = 0;
let jadd = 0;

let value = 0;
let valueArray = [];
for (let iadd = 0; iadd <= squareWidth - place2search; iadd++) {
  // 큰 범위(탐색범위)의 가로 이동
  for (let jadd = 0; jadd <= squareWidth - place2search; jadd++) {
    // 세로 이동
    for (let i = iadd; i <= place2search - 1 + iadd; i++) {
      // 범위 내에서 가로 탐색
      for (let j = jadd; j <= place2search - 1 + jadd; j++) {
        // 범위 내에서 세로 탐색
        // console.log(i, j);
        value += bomb[i][j];
      }
    }
    valueArray.push(value);
    // console.log("----------");
    value = 0;
  }
  //   console.log("/////////////");
}

console.log(Math.max.apply(null, valueArray));

let maxValue = 0;
for (let i of valueArray) {
  if (i > maxValue) {
    maxValue = i;
  }
}

console.log(maxValue);

console.log(
  "77. -------------------------------------------------------------"
);

function matchStr(string) {
  let result = [];
  for (let i = 0; i < string.length; i++) {
    // console.log(result);
    for (let j = 0; j < i; j++) {
      result.push(string.slice(j, j + string.length + 1 - i));
      console.log("%d 루프에서 %d번째 푸쉬", i, j);
      console.log(result);
    }
  }
  return result;
}

//let ArrayResult = matchStr("ABCDEF");
let inputStr1 = "THIS";
let inputStr2 = "IS";
let resultArr1 = matchStr(inputStr1);
let resultArr2 = matchStr(inputStr2);

let commonStr = resultArr1
  .filter((x) => resultArr2.includes(x))
  .sort((a, b) => {
    return b.length - a.length;
  });

console.log(commonStr[0].length);

console.log(
  "78. -------------------------------------------------------------"
);

const dishArray = "6 3".split(" ");
const n = parseInt(dishArray[0], 10);
const k = parseInt(dishArray[1], 10);

console.log(n, k);

function eatDishes(n, k) {
  let index = 0;
  let q = [];
  for (let i = 0; i < n; i++) {
    q.push(i + 1);
  }
  while (q.length > 2) {
    if (index > q.length - 1) {
      index -= q.length;
    }
    q.splice(index, 1);
    index += k;
    index -= 1;
  }
  return q;
}

let resultArr = eatDishes(n, k);
console.log(resultArr);

console.log(
  "79. -------------------------------------------------------------"
);

const list = [10, 20, 25, 27, 34, 35, 39];
const turn = 5;
function arrDiffer(list, turn) {
  let b = list.slice();
  let c = [];

  for (let i = 0; i < turn; i++) {
    b.unshift(b.pop());
    // unshift() 메서드를 사용하면 위치를 바꿀 수 있다 return값은 arr의 길이값
  }
  for (let i in b) {
    c.push(Math.abs(list[i] - b[i]));
  }
  console.log(list);
  console.log(b);
  console.log(c);
  const minVal = Math.min.apply(null, c);
  let index = c.indexOf(minVal);
  console.log("최소값 : %d", minVal);
  console.log("인덱스값 : %d, %d", list[index], b[index]);
}

arrDiffer(list, turn);

console.log(
  "80. -------------------------------------------------------------"
);

function combination(charArray, inputNumber) {
  let combi = [];

  const f = (prefix, charArray) => {
    for (let i = 0; i < charArray.length; i++) {
      // console.log("f함수 실행");
      combi.push(prefix + charArray[i]);
      f(prefix + charArray[i], charArray.slice(i + 1));
    }
    return combi;
  };
  /*
        prefix     charArray     combi
        ''        ["A", "B",]   
      
      
      */
  f("", charArray);
  console.log(combi);

  const filteredArr = combi.filter((x) => {
    return x.length === inputNumber;
  });
  return filteredArr;
}
const arrInput = "A,B,C,D".split(",");
console.log(arrInput);
const inputNumber = 2;
const filteredArray = combination(arrInput, inputNumber);
console.log(filteredArray);
