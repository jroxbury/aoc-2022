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

const headPosition: Cords = [0, 0];
let tailPosition: Cords = [0, 0];
const tailVisitPositions = new Set().add("0,0");

export function part1(): void {
  for (const move of data) {
    const [direction, amount] = move;
    moveHeadPosition(direction, amount);
  }
  console.log(tailVisitPositions.size);
}

function moveHeadPosition(direction: Direction, amount: number): void {
  for (let i = 0; i < amount; i++) {
    const previousHeadPosition: Cords = [...headPosition];
    if (direction === "U") headPosition[1] += 1;
    if (direction === "D") headPosition[1] -= 1;
    if (direction === "L") headPosition[0] -= 1;
    if (direction === "R") headPosition[0] += 1;

    if (shouldTailMove(headPosition, tailPosition)) {
      tailPosition = previousHeadPosition;
      addTailVisit(tailPosition);
    }
  }
}

function shouldTailMove(headPosition: Cords, tailPosition: Cords): boolean {
  const [headX, headY] = headPosition;
  const [tailX, tailY] = tailPosition;
  const xDiff = Math.abs(headX - tailX);
  const yDiff = Math.abs(headY - tailY);
  return xDiff > 1 || yDiff > 1;
}

function addTailVisit(tailPosition: Cords): void {
  tailVisitPositions.add(tailPosition.join(","));
}
