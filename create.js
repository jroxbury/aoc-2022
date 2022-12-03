// include fs-extra package
const fs = require("fs");
const path = require("path");
const fsExtra = require("fs-extra");
const prompt = require("prompt-sync")({ sigint: true });
const day = prompt("What day of AOC? ");

const source = "template";
const destination = `day-${day}`;

async function copyTemplate() {
  // Copy Template folder to new destination
  await fsExtra.copy(source, destination);

  const updateDayIndexPath = path.resolve(__dirname, `day-${day}\\index.ts`);
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
}

// Don't over write existing directories
if (!fs.existsSync(path.resolve(__dirname, `day-${day}`))) {
  copyTemplate();

  console.log(`Created day ${day}`);
} else {
  console.log("Directory already exists");
}
