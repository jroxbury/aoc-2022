const fs = require('fs');
const path = require("path");
// const data = fs.readFileSync(path.resolve(__dirname, "data.txt")).toString();
const data = fs.readFileSync(path.resolve(__dirname, "data-example.txt")).toString();

export function day3(){
    console.log(data);
}