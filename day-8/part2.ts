const fs = require("fs");
const path = require("path");
let data = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .split("\n")
  .map((item) => item.split("").map((item) => Number(item)));

const width = data[0].length - 1;
const height = data.length - 1;

export function part2(): void {
  let highestScenicScore = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const scenicScore = getScenicScore(i, j);
      if (scenicScore > highestScenicScore) {
        highestScenicScore = scenicScore;
      }
    }
  }
  console.log(highestScenicScore);
}

function getScenicScore(x: number, y: number): number {
  return up(x, y) * down(x, y) * left(x, y) * right(x, y);
}

function up(x: number, y: number): number {
  const currentNum = data[x][y];
  let treeCount = 0;
  while (x > 0) {
    treeCount += 1;
    x -= 1;
    if (data[x][y] >= currentNum) {
      return treeCount;
    }
  }
  return treeCount;
}

function down(x: number, y: number): number {
  const currentNum = data[x][y];
  let treeCount = 0;
  while (x < height) {
    treeCount += 1;
    x += 1;
    if (data[x][y] >= currentNum) {
      return treeCount;
    }
  }
  return treeCount;
}

function left(x: number, y: number): number {
  const currentNum = data[x][y];
  let treeCount = 0;
  while (y > 0) {
    treeCount += 1;
    y -= 1;
    if (data[x][y] >= currentNum) {
      return treeCount;
    }
  }
  return treeCount;
}

function right(x: number, y: number): number {
  const currentNum = data[x][y];
  let treeCount = 0;
  while (y < width) {
    treeCount += 1;
    y += 1;
    if (data[x][y] >= currentNum) {
      return treeCount;
    }
  }
  return treeCount;
}
