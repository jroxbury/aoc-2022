const fs = require("fs");
const path = require("path");
const data = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .split("\n")
  .map((item) => item.split(" "));

export function part2(): void {
  let total = 0;
  for (let round of data) {
    const [elf, me] = round;
    const [, elfPlay] = mapLetter(elf);
    total += rules[cheat(elfPlay, me)] + rules[me];
  }

  console.log(total);
}

type RPS = "rock" | "paper" | "scissors";

const rules = {
  rock: 1,
  paper: 2,
  scissors: 3,
  X: 0,
  Y: 3,
  Z: 6,
};

function mapLetter(letter: "A" | "B" | "C"): [number, RPS] {
  switch (letter) {
    case "A":
      return [rules["rock"], "rock"];
    case "B":
      return [rules["paper"], "paper"];
    case "C":
      return [rules["scissors"], "scissors"];
  }
}

function cheat(elf: RPS, letter: "X" | "Y" | "Z"): RPS {
  // lose
  if (letter === "X") {
    if (elf === "rock") return "scissors";
    if (elf === "scissors") return "paper";
    if (elf === "paper") return "rock";
  }

  // draw
  if (letter === "Y") {
    if (elf === "rock") return "rock";
    if (elf === "scissors") return "scissors";
    if (elf === "paper") return "paper";
  }

  // win
  if (letter === "Z") {
    if (elf === "scissors") return "rock";
    if (elf === "paper") return "scissors";
    if (elf === "rock") return "paper";
  }
}
