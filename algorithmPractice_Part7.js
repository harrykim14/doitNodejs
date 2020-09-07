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
