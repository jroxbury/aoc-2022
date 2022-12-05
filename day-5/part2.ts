const fs = require("fs");
const path = require("path");
let data = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .split("\n");

export function part2(): void {
  const separator = data.findIndex((item) => item === "");
  const columns = data
    .slice(separator - 1, separator)[0]
    .trim()
    .split("  ")
    .map((item) => item.trim());
  const numColumns = Number(columns[columns.length - 1]);
  const stackData = data.slice(0, separator - 1);
  const instructions = data
    .slice(separator + 1)
    .map((instruction) => parseInstructions(instruction));

  const stacks = [] as unknown as [string[]];
  for (let index = 0; index < numColumns; index++) {
    stacks.push([]);
  }

  for (let i = 0; i < stackData.length; i++) {
    getStackValue(stackData[i]);
  }

  for (const instruct of instructions) {
    let [count, from, to] = instruct;
    from -= 1;
    to -= 1;

    if (count === 1) {
      stacks[to].push(stacks[from].pop());
    } else {
      stacks[to] = [
        ...stacks[to],
        ...stacks[from].splice(stacks[from].length - count),
      ];
    }
  }

  let str = "";
  for (const row of stacks) {
    str += row.pop();
  }
  console.log(str);

  function getStackValue(row: string) {
    let counter = 1;
    for (let index = 0; index < numColumns; index++) {
      if (typeof row[counter] === "string" && row[counter] != " ") {
        stacks[index].unshift(row[counter]);
      }
      counter += 4;
    }
  }

  function parseInstructions(instructions: string) {
    const regex = /[\s\d\s]+/g;
    return instructions.match(regex).map((num) => Number(num));
  }
}
