import fs from 'fs/promises';
import { getPath } from '../utils/getPath.js';

const args = process.argv.slice(2);
const filename = getPath(args);

const create = async () => {
  try {
    await fs.appendFile(filename, '', { flag: 'ax+' });
    console.log("\x1b[35mFile was created\x1b[0m");
  } catch (error) {
    console.error("\x1b[31mOperation failed:\x1b[0m", error.message);
  }
};

await create();