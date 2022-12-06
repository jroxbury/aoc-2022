const fs = require("fs");
const path = require("path");
let data = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .trim();

export function part2(): void {
  console.log(iterString(14));
}

function iterString(num: number): number {
  for (let i = num - 1; i < data.length; i++) {
    if (isUnique(new Array(num).fill("").map((d, j) => data[i - j]))) {
      return i + 1;
    }
  }
}

function isUnique(args: string[]): boolean {
  const hash = {};
  return args.map((item) => hashIt(item, hash)).every((item) => !!item);
}

function hashIt(item: string, hash: object): boolean {
  if (hash[item]) {
    return false;
  }
  hash[item] = true;
  return true;
}
