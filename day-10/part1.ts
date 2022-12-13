const fs = require("fs");
const path = require("path");
let data: string | [string, number][] = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .split("\n")
  .map((item: string) => {
    if (item === "noop") return item;
    const [addx, num] = item.split(" ");
    return [addx, Number(num)];
  });

let start = 1;
let cycleCount = 0;
let total = 0;

export function part1(): void {
  for (const instruction of data) {
    if (instruction === "noop") {
      cycleCount += 1;
      checkCycleCount();
    }
    if (typeof instruction !== "string") {
      cycleCount += 1;
      checkCycleCount();

      cycleCount += 1;
      checkCycleCount();

      start += instruction[1];
    }
  }
  console.log(total);
}

function checkCycleCount(): void {
  const cycleCounts = [20, 60, 100, 140, 180, 220];
  if (cycleCounts.includes(cycleCount)) total += cycleCount * start;
}
