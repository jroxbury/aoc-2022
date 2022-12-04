const fs = require("fs");
const path = require("path");
let data = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .split("\n")
  .map((item) => item.split(","));

export function part1(): void {
  let count = 0;
  for (const row of data) {
    const [oneStart, oneFinish] = row[0].split("-").map((item) => Number(item));
    const [twoStart, twoFinish] = row[1].split("-").map((item) => Number(item));
    if (
      (oneStart <= twoStart && oneFinish >= twoFinish) ||
      (twoStart <= oneStart && twoFinish >= oneFinish)
    ) {
      count += 1;
    }
  }
  console.log(count);
}
