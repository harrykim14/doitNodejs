const user1 = require("./user1");

function showUser() {
  return user1.getUser().name + ", " + user1.group.name;
}

console.log("사용자 정보1 : %s", showUser());

// const user2 = require("./user2");

// function showUser2() {
//   return user2.getUser().name + ", " + user2.group.name;
// }

// console.log("사용자 정보2 : %s", showUser2());

const user3 = require("./user3");

function showUser3() {
  return user3.getUser().name + ", " + user3.group.name;
}

console.log("사용자 정보3 : %s", showUser3());
