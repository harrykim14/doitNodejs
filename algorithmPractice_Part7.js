console.log(
  "81. -------------------------------------------------------------"
);

let value = "0 1 0 0 0\n0 0 0 0 0\n0 0 0 1 0\n0 0 1 0 0\n0 0 0 0 0";
const flagArr = value
  .split("\n")
  .map((value) => {
    return [value];
  })
  .map(([value]) => {
    return value.replace("1", "f").split(" ");
  });

let bombArr = flagArr.map((row) => {
  if (row.includes("f")) {
    let rowIndex = flagArr.indexOf(row);
    if (rowIndex > 0) {
      let colIndex = row.indexOf("f");
      flagArr[rowIndex - 1][colIndex] = "*";
      if (colIndex > 0) {
        flagArr[rowIndex][colIndex - 1] = "*";
      }
      if (colIndex < 4) {
        flagArr[rowIndex][colIndex + 1] = "*";
      }
    }
    if (rowIndex < 4) {
      let colIndex = row.indexOf("f");
      flagArr[rowIndex + 1][colIndex] = "*";
      if (colIndex > 0) {
        flagArr[rowIndex][colIndex - 1] = "*";
      }
      if (colIndex < 4) {
        flagArr[rowIndex][colIndex + 1] = "*";
      }
    }
  }
});

console.log(flagArr);

let flagStr = value.split("\n").join(" ").split(" ");
flagStr.map((str, index) => {
  if (str === "1") {
    flagStr[index] = "f";
    if (index > 0) {
      flagStr[index - 1] = "*";
    }
    if (index < flagStr.length) {
      flagStr[index + 1] = "*";
    }
    if (index > 5) {
      flagStr[index - 5] = "*";
    }
    if (index < flagStr.length - 5) {
      flagStr[index + 5] = "*";
    }
  }
});

let bombResultArr = [];
let temp = [];
for (let idx in flagStr) {
  temp.push(flagStr[idx]);
  if (temp.length === 5) {
    bombResultArr.push(temp);
    temp = [];
  }
}

console.log(bombResultArr);

console.log(
  "82~83. -------------------------------------------------------------"
);

let bracketInput = "{(({()}))}";

function checkBrack(s) {
  const m = {
    ")": "(",
    "}": "{",
  };
  let stack = [];

  for (let i in s) {
    if (s[i] === "(" || s[i] === "{") {
      stack.push(s[i]);
    } else if (m[s[i]]) {
      // console.log(m[s[i]]);
      if (stack.length === 0) {
        return false;
      } else {
        let t = m[s[i]];
        if (t != stack.pop()) {
          return false;
        }
      }
    }
  }
  return stack.length === 0;
}

console.log(checkBrack(bracketInput));

console.log(
  "84. -------------------------------------------------------------"
);

function maxCombination(chars, length) {
  let result = [];

  const f = (pre, chars) => {
    for (let i = 0; i < chars.length; i++) {
      result.push(pre + chars[i]);
      // console.log(chars.slice(i + 1));
      f(pre + chars[i], chars.slice(i + 1));
    }
  };

  f("", chars);
  console.log(result);
  result = result
    .filter((num) => {
      return num.length === length;
    })
    .sort((a, b) => {
      return parseInt(b, 10) - parseInt(a, 10);
    });

  console.log(result);

  return result[0];
}

const inputNum = "1723";
const numLength = 2;
const maxVal = maxCombination(inputNum, numLength);
console.log(maxVal);

console.log(
  "85. -------------------------------------------------------------"
);
// let result = "";
// for (let i = 0; i < 10001; i++) {
//   result += i;
// }
// // console.log(result);
// let re = new RegExp(8, "g");
// console.log(result.match(re));

function chknum(n) {
  let answer = "1";
  if (n === 1) return 1;

  for (let i = 1; i < n; i++) {
    answer = rule(answer);
  }

  return answer;
}

function rule(answer) {
  let answerMax = 9;
  let result = "";

  for (let i = 1; i < answerMax; i++) {
    let re = new RegExp(i, "g");
    let count = (answer.match(re) || []).length;

    if (count >= 1) {
      result = result + String(i) + String(count);
    }
  }
  return result;
}

const user_input = 6;
console.log(chknum(user_input));

console.log(
  "86. -------------------------------------------------------------"
);

const point = [5, 2, 3, 1, 2, 5];
const dish = 1;

function eatSushi(point, dish) {
  let answer = 0;
  dish -= 1;

  let sp = point.slice();
  console.log(sp);
  sp.sort((a, b) => {
    return a - b;
  });

  while (true) {
    let p = point.shift();

    if (sp[0] === p) {
      if (dish === 0) {
        break;
      }
      dish -= 1;
      sp.shift();
    } else {
      point.push(p);
      if (dish === 0) {
        dish = point.length - 1;
      } else {
        dish -= 1;
      }
    }

    answer += 1;
  }

  return answer;
}

console.log(eatSushi(point, dish));

console.log(
  "87. -------------------------------------------------------------"
);
const name = "손오공 야무챠 베지터 피콜로".split(" ");
const pointOf = "70 10 55 40".split(" ");

const point_int = pointOf.map((x) => {
  return parseInt(x, 10);
});

function sol(name, point) {
  let temp = [];
  for (let i of name) {
    let obj = {};
    obj["name"] = i;
    obj["value"] = point[name.indexOf(i)];
    temp.push(obj);
  }
  temp.sort((a, b) => {
    return a.value < b.value ? 1 : a.value > b.value ? -1 : 0;
  });
  console.log(temp);
  let resultObj = {};
  for (let i of temp) {
    resultObj[i["name"]] = temp.indexOf(i) + 1;
  }
  console.log(resultObj);
}

sol(name, point_int);

console.log(
  "88~89. -------------------------------------------------------------"
);

const xaxis = 4;
const yaxis = 5;
const charAxis = [0, 0];
const obstacle = [
  [0, 1],
  [1, 1],
  [2, 3],
  [1, 3],
];
const moveChar = [2, 2, 2, 4, 4, 4];

function make_map(xaxis, yaxis, charAxis, obstacle, moveChar) {
  let map = [];
  for (let y = 0; y < yaxis + 2; y++) {
    map.push(Array(xaxis + 2).fill(0));
  }
  console.log(map);
  const realCharAxis = charAxis.map((x) => {
    return x + 1;
  });
  const realObstacleAxis = obstacle.map((x, index) => {
    return x.map((y) => {
      return y + 1;
    });
  });
  console.log(realCharAxis, realObstacleAxis);
  map.map((value, index) => {
    if (index === 0 || index === map.length - 1) {
      for (let v = 0; v < value.length; v++) {
        value[v] = 2;
      }
    }
    value[0] = 2;
    value[value.length - 1] = 2;
  });

  // 캐릭터 위치 설정
  let charXaxis = realCharAxis[0];
  let charYaxis = realCharAxis[1];
  map[charXaxis][charYaxis] = 1;

  // 장애물 위치 설정
  for (let obstacle of realObstacleAxis) {
    let obsXaxis = obstacle[0];
    let obsYaxis = obstacle[1];
    map[obsXaxis][obsYaxis] = 2;
  }
  console.log("이동 전 위치");
  console.log(map);

  for (let move of moveChar) {
    if (move === 1 && map[charYaxis - 1][charXaxis] != 2) {
      map[charYaxis][charXaxis] = 0;
      charYaxis -= 1;
      map[charYaxis][charXaxis] = 1;
    } else if (move === 2 && map[charYaxis + 1][charXaxis] != 2) {
      map[charYaxis][charXaxis] = 0;
      charYaxis += 1;
      map[charYaxis][charXaxis] = 1;
    } else if (move === 3 && map[charYaxis][charXaxis - 1] != 2) {
      map[charYaxis][charXaxis] = 0;
      charXaxis -= 1;
      map[charYaxis][charXaxis] = 1;
    } else if (move === 4 && map[charYaxis][charXaxis + 1] != 2) {
      map[charYaxis][charXaxis] = 0;
      charXaxis += 1;
      map[charYaxis][charXaxis] = 1;
    }

    // console.log("이동했습니다");
    // console.log(map);
  }

  console.log("이동 후 위치");
  console.log(map);
}

make_map(xaxis, yaxis, charAxis, obstacle, moveChar);

console.log(
  "90. -------------------------------------------------------------"
);

let list = [];

for (let i = 65; i < 91; i++) {
  list.push(String.fromCharCode(i));
}

console.log(list);

function randomItem(a) {
  let string = [];

  while (string.length !== 8) {
    let b = a[Math.floor(Math.random() * a.length)];
    if (!string.includes(b)) {
      string.push(b);
    }
  }

  let medicine = string.join("");
  return medicine;
}
console.log(randomItem(list));

let total_medicine = [];
while (total_medicine.length !== 100) {
  let m = randomItem(list);
  if (!total_medicine.includes(m)) {
    total_medicine.push(m);
  }
}
console.log(total_medicine);

let inputStr = "ABCDEFGH 4".split(" ");
let result = [];

for (let i of total_medicine) {
  let setUserData = new Set(inputStr[0]);
  let setMedicine = new Set(i);
  let intersection = new Set(
    [...setUserData].filter((x) => {
      return setMedicine.has(x);
    })
  );
  if (intersection.size === parseInt(inputStr[1], 10)) {
    result.push(i);
  }
}
console.log(result);
console.log(result.length);
