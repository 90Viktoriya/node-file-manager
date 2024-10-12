import fs from 'fs/promises';
import { getPath } from '../utils/getPath.js';

const args = process.argv.slice(2);
const filename = getPath(args);

const read = async () => {
  try {
  const contents = await fs.readFile(filename, { encoding: 'utf8' });
  console.log("\x1b[32mFile content:\x1b[0m");
  console.log(`\x1b[33m${contents}\x1b[0m`);
  } catch (error) {
    console.error("\x1b[31mOperation failed:\x1b[0m", error.message);
  }
};

await read();