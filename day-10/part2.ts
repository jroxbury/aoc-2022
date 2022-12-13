const fs = require("fs");
const path = require("path");
let data: string | [string, number][] = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .split("\n")
  .map((item) => {
    if (item === "noop") return item;
    const [addx, num] = item.split(" ");
    return [addx, Number(num)];
  });

let sprite = 1;
let cycleCount = 0;
let row = 0;
const screen = [
  ["........................................"],
  ["........................................"],
  ["........................................"],
  ["........................................"],
  ["........................................"],
  ["........................................"],
];

export function part2(): void {
  for (const instruction of data) {
    if (instruction === "noop") {
      draw();
      updateCycleCount();
    }
    if (typeof instruction !== "string") {
      draw();
      updateCycleCount();
      draw();
      updateCycleCount();
      sprite += instruction[1];
    }
  }
  console.log(screen);
}

function getSpriteCords(sprite: number): [number, number, number] {
  return [sprite - 1, sprite, sprite + 1];
}

function updateCycleCount(): void {
  cycleCount += 1;
  if (cycleCount === 40) {
    row += 1;
    cycleCount = 0;
  }
}

function draw(): void {
  if (getSpriteCords(sprite).includes(cycleCount)) {
    replacePixel();
  }
}

function replacePixel(): void {
  let arr = screen[row][0].split("");
  arr[cycleCount] = "#";
  screen[row][0] = arr.join("");
}
