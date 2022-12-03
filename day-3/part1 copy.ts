const fs = require("fs");
const path = require("path");
let data = fs.readFileSync(path.resolve(__dirname, "data.txt")).toString();
// let data = fs.readFileSync(path.resolve(__dirname, "data-example.txt")).toString();
data = data.split("\r\n").map((row: string) => {
  const rowLength = row.length / 2;
  return [row.slice(0, rowLength), row.slice(rowLength)];
});

function findCommonLetter(arr1: string[], arr2: string[]): string {
  let seen = {};
  for (const letter of arr1) {
    seen[letter] = true;
  }
  for (const letter of arr2) {
    if (seen[letter]) {
      return letter;
    }
  }
  return "";
}

function mapLetterToPriority(letter: string): number {
  const charCode = letter.charCodeAt(0);
  const lowercase = 96;
  const uppercase = 38;

  if (charCode > 90) {
    return charCode - lowercase;
  }
  return charCode - uppercase;
}

export function part1() {
  let total = 0;
  for (const [first, second] of data) {
    total += mapLetterToPriority(findCommonLetter(first, second));
  }
  console.log(total);
}
