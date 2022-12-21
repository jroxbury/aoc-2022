const fs = require("fs");
const path = require("path");
let data = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .split("\n")
  .map((item: string) => item.split(": "));

const monkies = {};
const me = "humn";

export function part2(): void {
  for (const item of data) {
    let [name, op] = item;
    if (name === "root") {
      op = op.replace(/\+|\*|\/|\-/, "=");
    }
    monkies[name] = getOp(op);
  }

  // Calculation doesn't take 'humn' into account so never changes.
  const target = monkies["pqtt"]();

  // Need to find what number to return for 'humn' to match target.
  let myNum = 3769668716709;
  monkies[me] = () => myNum;
  const num = monkies["vpmn"]();
  // while (monkies["pqtt"]() - monkies["vpmn"]() > 0) {
  //   myNum -= 100;
  // }
  // console.log(myNum);
  console.log("num: ", num);
  console.log("target: ", target); // 40_962_717_833_337
  console.log("diff: ", Math.floor(target - num));
}

function getOp(op: string): () => number | boolean {
  if (op.includes(" + ")) {
    const [m1, m2] = op.split(" + ");
    return () => monkies[m1]() + monkies[m2]();
  } else if (op.includes(" - ")) {
    const [m1, m2] = op.split(" - ");
    return () => monkies[m1]() - monkies[m2]();
  } else if (op.includes(" * ")) {
    const [m1, m2] = op.split(" * ");
    return () => monkies[m1]() * monkies[m2]();
  } else if (op.includes(" / ")) {
    const [m1, m2] = op.split(" / ");
    return () => monkies[m1]() / monkies[m2]();
  } else if (op.includes(" = ")) {
    // do nada
  } else {
    return () => Number(op);
  }
}
