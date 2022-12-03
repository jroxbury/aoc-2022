const fs = require("fs");
const path = require("path");
let data = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .replaceAll("\r", "")
  .split("\n\n")
  .map((item) => item.split("\n").map((item) => Number(item)));

export function part1(): void {
  let elfCount = 0;
  let largest = 0;
  const elfs = {};
  for (let item of data) {
    elfCount += 1;
    const sum = item.reduce((accum, next) => accum + next, 0);
    if (sum > largest) {
      largest = sum;
    }
    elfs[elfCount] = sum;
  }
  console.log(largest);
}
