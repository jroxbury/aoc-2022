const fs = require("fs");
const path = require("path");
let data = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .replaceAll("\r", "")
  .split("\n\n")
  .map((item) => item.split("\n").map((item) => Number(item)));

export function part2() {
  let elfCount = 0;
  let largest = {
    index: 0,
    size: 0,
  };
  const elfs = {};
  for (let item of data) {
    elfCount += 1;
    const sum = item.reduce((accum, next) => accum + next, 0);
    if (sum > largest.size) {
      largest = {
        index: elfCount,
        size: sum,
      };
    }
    elfs[elfCount] = sum;
  }

  let arr = [];
  for (const key in elfs) {
    arr.push(elfs[key]);
  }
  arr.sort((a, b) => b - a);
  console.log(arr[0] + arr[1] + arr[2]);
}
