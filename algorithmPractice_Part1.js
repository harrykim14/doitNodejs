("1. -------------------------------------------------------------");
// 1.

var nums = [100, 200, 300, 400, 500];

var filtered = nums.filter((number) => number < 400);

console.log(filtered);

console.log("2. -------------------------------------------------------------");

var arr = [200, 100, 300];
arr.splice(2, 0, 1000);
// splice (새 개체 넣을 자리, 제거할 요소 index, 새로 넣을 요소)
console.log(arr);

console.log("3. -------------------------------------------------------------");

var arr3 = [100, 200, 300];
console.log(typeof arr3);
// object

console.log("4. -------------------------------------------------------------");

console.log(typeof 2.22);
// number

console.log("5. -------------------------------------------------------------");

let a = 10;
let b = 2;

for (let i = 1; i < 5; i += 2) {
  a += i;
}

console.log(a + b);

console.log("6. -------------------------------------------------------------");

console.log(!NaN);
console.log(!1); // 얘만 트루
console.log(!"");
console.log(!0);
console.log(!undefined);

// falsy : 0, '', NaN, false, null, undefined
// truthy : 외 나머지

console.log("9. -------------------------------------------------------------");

const d = {
  height: 180,
  weight: 78,
  weight: 84,
  temperature: 36,
  eyesight: 1,
};

console.log(d["weight"]);

console.log("9. -------------------------------------------------------------");

const year = "2019",
  month = "04",
  day = "26",
  hour = "11",
  minute = "34",
  second = "27";

const result = `${year}/${month}/${day} ${hour}:${minute}:${second}`;

console.log(result);

console.log(
  "10. -------------------------------------------------------------"
);

const level = 5;

for (let i = 1; i <= level; i++) {
  let tree = "";
  for (let k = 1; k <= level - i; k++) {
    tree += " ";
  }
  for (let j = 1; j <= i * 2 - 1; j++) {
    tree += "*";
  }
  console.log(tree);
}

console.log(
  "11. -------------------------------------------------------------"
);

let s = 0;

for (let i = 1; i <= 100; i++) {
  s += i;
}

console.log(s);

console.log(
  "12. -------------------------------------------------------------"
);

class Wizard {
  constructor(health, mana, armor) {
    this.health = health;
    this.mana = mana;
    this.armor = armor;
    console.log("constr uction complete");
  }

  attack() {
    console.log("파이어볼");
  }
}

const x = new Wizard(545, 210, 10);
console.log(x.health, x.mana, x.armor);
x.attack();

console.log(
  "13. -------------------------------------------------------------"
);

const planets = [
  "수성",
  "금성",
  "지구",
  "화성",
  "목성",
  "토성",
  "천왕성",
  "해왕성",
];

//const n = prompt("몇번째 행성을 원하나요?");
const n = 3;
console.log(planets[n - 1]);

console.log(
  "14. -------------------------------------------------------------"
);

let number14 = Math.round(Math.random() * 10);
// let number14 = prompt("숫자를 입력해주세요")

if (number14 % 3 === 0 && number14 !== 0) console.log("짝");
else console.log(number14);

console.log(
  "15. -------------------------------------------------------------"
);

// const name15 = prompt("이름을 입력해주세요");
const name15 = "김씨";

console.log(`안녕하세요 저는 ${name15}입니다.`);

console.log(
  "16. -------------------------------------------------------------"
);

const string16 = "거꾸로";

console.log(string16.split("").reverse().join(""));

console.log(
  "17. -------------------------------------------------------------"
);

const height = "160";
// const height = prompt("키를 입력해주세요");

if (height >= 150) console.log("YES");
else console.log("NO");

console.log(
  "18. -------------------------------------------------------------"
);

const score = ["70", "82", "95"];

let sum = 0;

for (let i = 0; i < score.length; i++) {
  sum += parseInt(score[i], 10);
}

let average = Math.floor(sum / score.length);

console.log(average);

console.log(
  "19. -------------------------------------------------------------"
);

const numArray19 = ["17", "22"];
// const num = prompt().split(" ");

console.log(Math.pow(parseInt(numArray19[0], 10), parseInt(numArray19[1], 10)));

console.log(
  "20. -------------------------------------------------------------"
);

const numArray20 = ["10", "3"];

let result20 = Math.floor(parseInt(numArray20[0]) / parseInt(numArray20[1]));

let remainder = parseInt(numArray20[0]) % parseInt(numArray20[1]);

console.log("몫:" + result20 + ", 나머지:" + remainder);
