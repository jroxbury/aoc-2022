const fs = require("fs");
const path = require("path");
let data = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .split("\n")
  .map((item: string) => item.split(": "));

const monkies = {};

export function part1(): void {
  for (const item of data) {
    const [name, op] = item;
    monkies[name] = getSign(op);
  }

  while (
    Object.keys(monkies).some((monkey) => typeof monkies[monkey] === "function")
  ) {
    for (const monkey of Object.keys(monkies)) {
      if (typeof monkies[monkey] === "number") continue;
      if (!Number.isNaN(monkies[monkey](monkies))) {
        monkies[monkey] = monkies[monkey](monkies);
      }
    }
  }
  console.log(monkies["root"]);
}

function getSign(op: string): number | ((monkey: any) => number) {
  if (op.includes(" + ")) {
    const [m1, m2] = op.split(" + ");
    return (monkey: any) => Number(monkey[m1]) + Number(monkey[m2]);
  } else if (op.includes(" - ")) {
    const [m1, m2] = op.split(" - ");
    return (monkey: any) => Number(monkey[m1]) - Number(monkey[m2]);
  } else if (op.includes(" * ")) {
    const [m1, m2] = op.split(" * ");
    return (monkey: any) => Number(monkey[m1]) * Number(monkey[m2]);
  } else if (op.includes(" / ")) {
    const [m1, m2] = op.split(" / ");
    return (monkey: any) => Number(monkey[m1]) / Number(monkey[m2]);
  } else {
    return Number(op);
  }
}
