const fs = require("fs");
const path = require("path");
let data: string[] = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .split("\n")
  .map((row: string) => row.split(" -> "));

let smallestX = null;
let largestX = null;
let smallestY = null;
let largestY = null;
let board = [];
const startX = 500;
const startY = 0;
let running = true;
let count = 0;

export function part1(): void {
  findConstraints();
  buildBoard();
  while (running) {
    drop(startX, startY);
    count += 1;
  }
  console.log(count - 1);
}

function drop(x: number, y: number): void {
  if (y === largestY) {
    running = false;
    return;
  }
  if (downIsOpen(x, y)) {
    drop(x, y + 1);
  } else if (downLeftIsOpen(x, y)) {
    drop(x - 1, y + 1);
  } else if (downRightIsOpen(x, y)) {
    drop(x + 1, y + 1);
  } else {
    // Nothing is open so set new position.
    board[y][x] = "O";
  }
}

function findConstraints(): void {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length - 1; j++) {
      const [startX, startY] = data[i][j].split(",").map((v) => Number(v));
      const [stopX, stopY] = data[i][j + 1].split(",").map((v) => Number(v));
      if (startX < smallestX || stopX < smallestX || smallestX === null) {
        if (startX < stopX) {
          smallestX = startX;
        } else {
          smallestX = stopX;
        }
      }
      if (startX > largestX || stopX > largestX || largestX === null) {
        if (startX > stopX) {
          largestX = startX;
        } else {
          largestX = stopX;
        }
      }

      if (startY < smallestY || stopY < smallestY || smallestY === null) {
        if (startY < stopY) {
          smallestY = startY;
        } else {
          smallestY = stopY;
        }
      }
      if (startY > largestY || stopY > largestY || largestY === null) {
        if (startY > stopY) {
          largestY = startY;
        } else {
          largestY = stopY;
        }
      }
    }
  }
}

function buildBoard(): void {
  for (let i = 0; i < largestY + 1; i++) {
    board.push(new Array(largestX + 1).fill("."));
  }
  board[startY][startX] = "+";
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length - 1; j++) {
      const [startX, startY] = data[i][j].split(",").map((v) => Number(v));
      const [stopX, stopY] = data[i][j + 1].split(",").map((v) => Number(v));
      board[startY][startX] = "#";
      if (startX === stopX) {
        // Move Y
        const diff = Math.abs(startY - stopY);
        for (let i = 1; i < diff + 1; i++) {
          if (startY > stopY) {
            board[startY - i][startX] = "#";
          } else {
            board[startY + i][startX] = "#";
          }
        }
      }
      if (startY === stopY) {
        // Move X
        const diff = Math.abs(startX - stopX);
        for (let i = 1; i < diff + 1; i++) {
          if (startX > stopX) {
            board[startY][startX - i] = "#";
          } else {
            board[startY][startX + i] = "#";
          }
        }
      }
    }
  }
}

function downIsOpen(x: number, y: number): boolean {
  return board[y + 1][x] === ".";
}

function downLeftIsOpen(x: number, y: number): boolean {
  return board[y + 1][x - 1] === ".";
}

function downRightIsOpen(x: number, y: number): boolean {
  return board[y + 1][x + 1] === ".";
}
