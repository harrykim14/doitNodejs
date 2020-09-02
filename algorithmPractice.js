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
