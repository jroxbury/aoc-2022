const fs = require("fs");
const path = require("path");
type Rules = [
  number,
  number[],
  (old: number) => number,
  (old: number) => boolean,
  number,
  number
];
let data: Rules[] = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .split("\n\n")
  .map((item: string) => item.split("\n").map((item) => item.trim()))
  .map((item: string[]) => convertData(item));

let numberOfRounds = 0;

export function part1(): void {
  inspectItems();
  let inspections = [];
  for (const monkey of data) {
    inspections.push(monkey[0]);
  }
  const sorted = inspections.sort((a, b) => b - a);
  console.log(sorted[0] * sorted[1]);
}

function inspectItems(): void {
  for (const monkey of data) {
    while (monkey[1].length) {
      const startingWL = monkey[1].shift();
      monkey[0] += 1;
      const inspectionWL = monkey[2](startingWL);
      const afterInspectionWL = dropWorryLevel(inspectionWL);
      passToAnotherMonkey(monkey, afterInspectionWL);
    }
  }
  numberOfRounds += 1;
  if (numberOfRounds < 20) {
    inspectItems();
  }
}

function convertData(monkey: string[]): Rules {
  return monkey.map((m, i) => {
    if (i === 0) {
      return 0;
    }
    if (i === 1) {
      return m.match(/\d+/g).map((item) => Number(item));
    }
    if (i === 2) {
      const match = m.match(/([\+|\*]) (\d+)/g);
      if (!match) {
        return (old: number) => old * old;
      }
      const [sign, amount] = match[0].split(" ");
      const amountNum = Number(amount);
      if (sign === "*") {
        return (old: number) => old * amountNum;
      }
      return (old: number) => old + amountNum;
    }
    if (i === 3) {
      const amount = m.match(/\d+/g).map((item) => Number(item))[0];
      return (old: number) => old % amount === 0;
    }
    if (i === 4 || i === 5) {
      return m.match(/\d+/g).map((item) => Number(item))[0];
    }
  }) as Rules;
}

function dropWorryLevel(worryLevel: number): number {
  return Math.floor(worryLevel / 3);
}

function passToAnotherMonkey(monkey: Rules, afterInspectionWL: number): void {
  const passTest = monkey[3](afterInspectionWL);
  const monkeyToPassTo = passTest ? monkey[4] : monkey[5];
  data[monkeyToPassTo][1].push(afterInspectionWL);
}
