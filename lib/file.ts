import fs from "fs";
import path from "path";

export const getAllFilesByExt = (dir: string, extRegex: RegExp) => {
  const files: string[] = [];

  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      files.push(...getAllFilesByExt(filePath, extRegex));
    } else if (path.extname(file).match(/\.md$/)) {
      files.push(filePath);
    }
  });

  return files;
};
