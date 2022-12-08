const fs = require("fs");
const path = require("path");
let data = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .split("\n")
  .map((item) => item.split("").map((item) => Number(item)));

const width = data[0].length - 1;
const height = data.length - 1;

export function part1(): void {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (isTreeVisible(i, j)) {
        total += 1;
      }
    }
  }
  console.log(total);
}

function isTreeVisible(x: number, y: number): boolean {
  if (up(x, y)) return true;
  if (down(x, y)) return true;
  if (left(x, y)) return true;
  if (right(x, y)) return true;
  return false;
}

function up(x: number, y: number): boolean {
  const currentNum = data[x][y];
  while (x > 0) {
    x -= 1;
    if (data[x][y] >= currentNum) {
      return false;
    }
  }
  return true;
}

function down(x: number, y: number): boolean {
  const currentNum = data[x][y];
  while (x < height) {
    x += 1;
    if (data[x][y] >= currentNum) {
      return false;
    }
  }
  return true;
}

function left(x: number, y: number): boolean {
  const currentNum = data[x][y];
  while (y > 0) {
    y -= 1;
    if (data[x][y] >= currentNum) {
      return false;
    }
  }
  return true;
}

function right(x: number, y: number): boolean {
  const currentNum = data[x][y];
  while (y < width) {
    y += 1;
    if (data[x][y] >= currentNum) {
      return false;
    }
  }
  return true;
}
