const fs = require("fs");
const path = require("path");
const data = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .split("\n")
  .map((item) => item.split(" "));

export function part1(): void {
  let total = 0;
  for (let round of data) {
    const [elf, me] = round;
    const elfMove = mapLetter(elf);
    const myMove = mapLetter(me);
    total += rules[myMove] + checkWinner(elfMove, myMove);
  }
  console.log(total);
}

const rules = {
  rock: 1,
  paper: 2,
  scissors: 3,
  lost: 0,
  draw: 3,
  won: 6,
};

function mapLetter(
  letter: "A" | "B" | "C" | "X" | "Y" | "Z"
): "rock" | "paper" | "scissors" {
  switch (letter) {
    case "A":
    case "X":
      return "rock";
    case "B":
    case "Y":
      return "paper";
    case "C":
    case "Z":
      return "scissors";
  }
}

function checkWinner(elf: string, me: string): number {
  // Draw
  if (elf === me) {
    return rules["draw"];
  }

  // Lost
  if (
    (elf === "rock" && me === "scissors") ||
    (elf === "scissors" && me === "paper") ||
    (elf === "paper" && me === "rock")
  ) {
    return rules["lost"];
  }

  // Won
  if (
    (elf === "scissors" && me === "rock") ||
    (elf === "paper" && me === "scissors") ||
    (elf === "rock" && me === "paper")
  ) {
    return rules["won"];
  }
}
