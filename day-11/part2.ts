const fs = require("fs");
const path = require("path");
type Rules = [
  number,
  bigint[],
  (old: bigint) => bigint,
  bigint,
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
const commonModulo = data.reduce((accum, current) => {
  return accum * current[3];
}, BigInt(1));

export function part2(): void {
  inspectItems();
  let afterInspections = [];
  for (const monkey of data) {
    afterInspections.push(monkey[0]);
  }
  const sorted = afterInspections.sort((a, b) => b - a);
  console.log(sorted[0] * sorted[1]);
}

function inspectItems(): void {
  while (numberOfRounds < 10_000) {
    for (const monkey of data) {
      while (monkey[1].length) {
        const startingWL = monkey[1].shift();
        monkey[0] += 1;
        const inspectionWL = monkey[2](startingWL);
        passToAnotherMonkey(monkey, inspectionWL);
      }
    }
    numberOfRounds += 1;
  }
}

function convertData(monkey: string[]): Rules {
  return monkey.map((m, i) => {
    if (i === 0) {
      return 0;
    }
    if (i === 1) {
      return m.match(/\d+/g).map((item) => BigInt(item));
    }
    if (i === 2) {
      const match = m.match(/([\+|\*]) (\d+)/g);
      if (!match) {
        return (old: bigint) => old * old;
      }
      const [sign, amount] = match[0].split(" ");
      const amountNum = BigInt(amount);
      if (sign === "*") {
        return (old: bigint) => old * amountNum;
      }
      return (old: bigint) => old + amountNum;
    }
    if (i === 3) {
      return m.match(/\d+/g).map((item) => BigInt(item))[0];
    }
    if (i === 4 || i === 5) {
      return m.match(/\d+/g).map((item) => Number(item))[0];
    }
  }) as Rules;
}

function passToAnotherMonkey(monkey: Rules, afterInspectionWL: bigint): void {
  const passTest = afterInspectionWL % monkey[3] === BigInt(0);
  const monkeyToPassTo = passTest ? monkey[4] : monkey[5];
  data[monkeyToPassTo][1].push(afterInspectionWL % commonModulo);
}
