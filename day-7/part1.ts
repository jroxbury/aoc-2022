const fs = require("fs");
const path = require("path");

let data: string[] = fs
  .readFileSync(path.resolve(__dirname, "data.txt"))
  .toString()
  .split("\n");

type DirDict = { [index: string]: Dir };

class Dir {
  private readonly files: { [index: string]: number } = {};
  private readonly children = new Set<string>();
  private currentDirSize = 0;

  constructor(public name: string) {}

  private getChildren(): string[] {
    return Array.from(this.children);
  }

  public addFile(file: string): void {
    const [size, fileName] = file.split(" ");
    const fileSize = Number(size);
    this.currentDirSize += fileSize;
    this.files[fileName] = fileSize;
  }

  public setChild(directoryPath: string): void {
    this.children.add(directoryPath);
  }

  public getDirSize(dict: DirDict): number {
    return (
      this.currentDirSize +
      this.getChildren().reduce(
        (accum, item) => accum + dict[item].getDirSize(dict),
        0
      )
    );
  }
}

const dict: DirDict = {
  "/": new Dir("/"),
};

export function part1(): void {
  let currentPath = [];

  for (let i = 0; i < data.length; i++) {
    handleLine(data[i], currentPath, dict);
  }

  let total = 0;
  for (const key in dict) {
    const dirSize = dict[key].getDirSize(dict);
    if (dirSize <= 100000) {
      total += dirSize;
    }
  }
  console.log(total);
}

function handleLine(line: string, currentDir: string[], dict: DirDict): void {
  if (line.includes("$")) {
    handleCmd(line, currentDir);
    return;
  }

  if (line.includes("dir ")) {
    addDir(dict, line, currentDir);
    return;
  }

  handleFile(line, currentDir, dict);
}

function handleCmd(command: string, currentDirectoryPathArray: string[]): void {
  if (command.includes("cd ")) {
    const [, dir] = command.split("cd ");
    if (dir === "..") {
      currentDirectoryPathArray.pop();
    } else {
      currentDirectoryPathArray.push(dir);
    }
  }
}

function addDir(
  dict: DirDict,
  dir: string,
  currentDirectoryPathArray: string[]
) {
  const [, name] = dir.split(" ");
  const newDirectoryPath = [...currentDirectoryPathArray, name].join();
  if (!dict[newDirectoryPath]) {
    dict[newDirectoryPath] = new Dir(newDirectoryPath);
  }

  const currentDirectoryPath = currentDirectoryPathArray.join();
  dict[currentDirectoryPath].setChild(newDirectoryPath);
}

function handleFile(
  file: string,
  currentDirectoryPath: string[],
  dict: DirDict
) {
  dict[currentDirectoryPath.join()].addFile(file);
}
