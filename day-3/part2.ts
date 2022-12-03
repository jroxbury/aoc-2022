const fs = require("fs");
const path = require("path");
let data = fs.readFileSync(path.resolve(__dirname, "data.txt")).toString();
// let data = fs.readFileSync(path.resolve(__dirname, "data-example.txt")).toString();
data = data.split("\r\n");

function mapLetterToPriority(letter: string): number {
  const charCode = letter.charCodeAt(0);
  const lowercase = 96;
  const uppercase = 38;

  if (charCode > 90) {
    return charCode - lowercase;
  }
  return charCode - uppercase;
}

export function part2() {
  let current = 1;
  let firstRow = {};
  let secondRow = {};
  let total = 0;
  for (const row of data) {
    if (current === 1) {
      for (const letter of row) {
        firstRow[letter] = true;
      }
      current += 1;
      continue;
    }
    if (current === 2) {
      for (const letter of row) {
        secondRow[letter] = true;
      }
      current += 1;
      continue;
    }
    if (current === 3) {
      current = 1;
      for (const letter of row) {
        if (firstRow[letter] && secondRow[letter]) {
          total += mapLetterToPriority(letter);
          firstRow = {};
          secondRow = {};
          break;
        }
      }
    }
  }

  console.log(total);
}
