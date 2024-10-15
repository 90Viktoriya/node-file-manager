import fs from 'node:fs/promises';
import { basename, join } from 'node:path';
import { INVALID_INPUT, OPERATION_FAILED, FILE_CREATED, CREATION_FAILED } from '../utils/constants.js';

const args = process.argv.slice(2);

const filenameArg = args[1].slice(args[1].indexOf(' ')).trim();
let filename = '';
if (basename(filenameArg) === filenameArg) {
  filename = join(args[0],filenameArg);
} else {
  console.error(INVALID_INPUT, CREATION_FAILED);
  process.exit();
}

const create = async () => {
  try {
    await fs.appendFile(filename, '', { flag: 'ax+' });
    console.log(FILE_CREATED);
  } catch (error) {
    console.error(OPERATION_FAILED, error.message);
  }
};

await create();