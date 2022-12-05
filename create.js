// include fs-extra package
const fs = require("fs");
const path = require("path");
const fsExtra = require("fs-extra");
const prompt = require("prompt-sync")({ sigint: true });
const open = require("open");
const axios = require("axios").default;
require("dotenv").config();

const day = prompt("What day of AOC? ");
const aocUrl = `https://adventofcode.com/2022/day/${day}`;
const dataUrl = `https://adventofcode.com/2022/day/${day}/input`;
const cookie = process.env.COOKIE;

const source = "template";
const destination = `day-${day}`;

async function copyTemplate() {
  // Copy Template folder to new destination
  await fsExtra.copy(source, destination);

  const updateDayIndexPath = path.resolve(__dirname, `day-${day}\\index.ts`);
  const updateDataPath = path.resolve(__dirname, `day-${day}\\data.txt`);
  const mainIndexPath = path.resolve(__dirname, `index.ts`);

  fs.readFile(updateDayIndexPath, "utf8", function (err, data) {
    // Update function name
    const result = data.replace(/template/g, `day${day}`);

    fs.writeFile(updateDayIndexPath, result, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });

  fs.readFile(mainIndexPath, "utf8", function (err, data) {
    // Add import to main index.ts
    const result = `${data}\nimport { day${day} } from "./day-${day}";\n// day${day}();`;

    fs.writeFile(mainIndexPath, result, "utf8", function (err) {
      if (err) return console.log(err);
    });
  });

  const res = await axios.get(dataUrl, {
    headers: {
      "Content-Type": "text/plain",
      Cookie: cookie,
    },
    withCredentials: true,
  });

  fs.writeFile(updateDataPath, res.data, "utf8", function (err) {
    if (err) return console.log(err);
  });
}

// Don't over write existing data
if (!fs.existsSync(path.resolve(__dirname, `day-${day}`))) {
  copyTemplate();
  console.log(`Created day ${day}`);
} else {
  console.log("Directory already exists");
}

open(aocUrl);
