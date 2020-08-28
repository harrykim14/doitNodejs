const url = require("url");

const urlString =
  "https://www.google.com/search?q=ETF&oq=ETF&aqs=chrome..69i57j0l7.1143j0j4&sourceid=chrome&ie=UTF-8";
const curUrl = url.parse(urlString);

console.log(curUrl);

console.log("query -> " + curUrl.query);

const curStr = url.format(curUrl);
console.log("url -> " + curStr);

const queryString = require("querystring");
const params = queryString.parse(curUrl.query);
console.log("검색어:" + params.query);
