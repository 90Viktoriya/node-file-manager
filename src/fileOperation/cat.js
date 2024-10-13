import fs from 'fs/promises';
import { getPath } from '../utils/getPath.js';
import { OPERATION_FAILED, FILE_CONTENT } from '../utils/constants.js';

const args = process.argv.slice(2);
const filename = getPath(args);

const read = async () => {
  try {
  const contents = await fs.readFile(filename, { encoding: 'utf8' });
  console.log(FILE_CONTENT);
  console.log(`\x1b[33m${contents}\x1b[0m`);
  } catch (error) {
    console.error(OPERATION_FAILED, error.message);
  }
};

await read();