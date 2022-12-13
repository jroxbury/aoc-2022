const fs = require("fs");
const path = require("path");
type Direction = "R" | "L" | "U" | "D";
type Cords = [x: number, y: number];
let data = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .split("\n")
  .map((item: string) => {
    const splitArr = item.split(" ");
    const [direction, amount] = splitArr;
    return [direction, Number(amount)];
  });

const cords: Cords[] = [
  [0, 0], //H
  [0, 0], //1
  [0, 0], //2
  [0, 0], //3
  [0, 0], //4
  [0, 0], //5
  [0, 0], //6
  [0, 0], //7
  [0, 0], //8
  [0, 0], //9
];
const tailVisitPositions = new Set().add("0,0");

export function part2(): void {
  for (const move of data) {
    const [direction, amount] = move;
    moveHeadPosition(direction, amount);
  }

  console.log(tailVisitPositions.size);
}

function moveHeadPosition(direction: Direction, amount: number): void {
  for (let i = 0; i < amount; i++) {
    for (let j = 0; j < cords.length - 1; j++) {
      if (j === 0) {
        if (direction === "U") cords[0][1] += 1;
        if (direction === "D") cords[0][1] -= 1;
        if (direction === "L") cords[0][0] -= 1;
        if (direction === "R") cords[0][0] += 1;
      }

      if (shouldTailMove(cords[j], cords[j + 1])) {
        moveTailPosition(cords[j], cords[j + 1]);

        if (j === 8) {
          addTailVisit(cords[j + 1]);
        }
      }
    }
  }
}

function shouldTailMove(head: Cords, tail: Cords): boolean {
  const [headX, headY] = head;
  const [tailX, tailY] = tail;
  const xDiff = Math.abs(headX - tailX);
  const yDiff = Math.abs(headY - tailY);
  const val = xDiff > 1 || yDiff > 1;
  return val;
}

function addTailVisit(tail: Cords): void {
  tailVisitPositions.add(tail.join(","));
}

function moveTailPosition(head: Cords, tail: Cords): void {
  if (head[0] === tail[0]) {
    tail[0] += 0;
  } else {
    tail[0] += (head[0] - tail[0]) / Math.abs(head[0] - tail[0]);
  }
  if (head[1] === tail[1]) {
    tail[1] += 0;
  } else {
    tail[1] += (head[1] - tail[1]) / Math.abs(head[1] - tail[1]);
  }
}
