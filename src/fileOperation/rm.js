import fs from 'node:fs/promises';
import { getPath } from '../utils/getPath.js';
import { FILE_DELETED, OPERATION_FAILED } from '../utils/constants.js';

const args = process.argv.slice(2);
const filename = getPath(args);

const remove = async () => {
  try {
    await fs.rm(filename);
    console.log(FILE_DELETED);
  } catch (error) {
    console.error(OPERATION_FAILED, error.message);
  }
};

await remove();