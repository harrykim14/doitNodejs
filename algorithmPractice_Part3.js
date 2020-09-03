console.log(
  "41. -------------------------------------------------------------"
);

const prime = 137;

function primeFunc(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0 || n === 1) {
      console.log("No");
      return false;
    }
  }
  console.log("YES");
}

primeFunc(prime);

console.log(
  "42. -------------------------------------------------------------"
);

const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
let month = "5";
let date = "3";

function solution(year, month, date) {
  const theDay = new Date(`${year}-${month}-${date}`);
  const yoil = theDay.getDay();
  return yoil;
}

console.log(day[solution(2020, 12, 25)]);

console.log(
  "43. -------------------------------------------------------------"
);

let dec = 160;
let arrBinary = [];

while (dec) {
  arrBinary.push(dec % 2);
  dec = Math.floor(dec / 2);
}

console.log(arrBinary.reverse().join(""));
// console.log(dec.toString(2))로도 가능

console.log(
  "44. -------------------------------------------------------------"
);

let num = "1234";
let sum = 0;

while (num) {
  sum += num % 10;
  num = Math.floor(num / 10);
}

console.log(sum);

console.log(
  "45. -------------------------------------------------------------"
);

const theDate = new Date();
console.log(Math.floor(theDate.getTime() / (60 * 60 * 24 * 365 * 1000)) + 1970);

console.log(
  "46. -------------------------------------------------------------"
);

let arr46 = [];
let total = 0;

for (let i = 1; i <= 20; i++) {
  arr46[i - 1] = i;
}

arr46.forEach((n) => {
  while (n) {
    total += n % 10;
    n = Math.floor(n / 10);
  }
});
console.log(total);

console.log(
  "47. -------------------------------------------------------------"
);

const people = {
  이호준: "01050442903",
  이호상: "01051442904",
  이준호: "01050342904",
  이호준: "01050442903",
  이준: "01050412904",
  이호: "01050443904",
  이호준: "01050442903",
};

let result47 = new Set();
for (let key in people) {
  result47.add(people[key]);
}

console.log(result47.size);

console.log(
  "48. -------------------------------------------------------------"
);

let inputStr48 = "AAABBBcccddd";
let arr48 = [];

for (let i = 0; i < inputStr48.length; i++) {
  inputStr48[i] === inputStr48[i].toUpperCase()
    ? arr48.push(inputStr48[i].toLowerCase())
    : arr48.push(inputStr48[i].toUpperCase());
}

console.log(arr48.join(""));

console.log(
  "49. -------------------------------------------------------------"
);

const inputNum49 = "10 9 8 7 6 5 4 3 2 1";
const sortedArr49 = inputNum49
  .split(" ")
  .map((n) => {
    return parseInt(n, 10);
  })
  .sort((a, b) => {
    b - a;
  });

console.log("Max : " + sortedArr49[0]);
