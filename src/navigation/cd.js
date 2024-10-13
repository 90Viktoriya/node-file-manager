import { getPath } from '../utils/getPath.js';
import { access, constants, stat } from 'node:fs/promises';

const cd = async (args) => {
  const path = getPath(args);
  try {
    await access(path, constants.R_OK);
    const result = await stat(path);
    if (result.isDirectory()) {
      return path;
    } else {
      throw new Error("It's not a directory");
    }  
  } catch (error) {
    console.error("\x1b[31mOperation failed:\x1b[0m", error.message);
    return args[0];
  } 
}

export { cd }