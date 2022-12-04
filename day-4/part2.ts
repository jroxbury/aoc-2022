const fs = require("fs");
const path = require("path");
let data = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .split("\n")
  .map((item) => item.split(","));

export function part2(): void {
  let count = 0;
  for (let row of data) {
    const [oneFinish, twoStart] = getSmallestFinish(
      splitItem(row[0]),
      splitItem(row[1])
    );
    if (oneFinish < twoStart) {
      continue;
    }
    count += 1;
  }
  console.log(count);
}

function splitItem(rowItem: string): [number, number] {
  return rowItem.split("-").map((item: string) => Number(item)) as [
    number,
    number
  ];
}

function getSmallestFinish(
  rowOne: [number, number],
  rowTwo: [number, number]
): [number, number] {
  if (rowTwo[0] < rowOne[0]) {
    return [rowTwo[1], rowOne[0]];
  }
  return [rowOne[1], rowTwo[0]];
}
