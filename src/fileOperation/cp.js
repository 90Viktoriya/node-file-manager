import { resolve, join, basename } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import stream from 'node:stream/promises';
import { rm } from 'node:fs/promises';
import { getArgs } from '../utils/getArgs.js';
import { INVALID_INPUT, OPERATION_FAILED, INCORRECT_ARGS, FILE_MOVED, FILE_COPIED } from '../utils/constants.js';

const args = process.argv.slice(2);
const parsedArgs = getArgs(args[1], 2);

if (parsedArgs.length !== 2) {
  console.error(INVALID_INPUT, INCORRECT_ARGS);
  process.exit();
}

const copy = async () => {
  try {
    const srcFileName = resolve(args[0], parsedArgs[0]);
    const newFileName = join(resolve(args[0], parsedArgs[1]), basename(srcFileName));
  
    await stream.pipeline(createReadStream(srcFileName), createWriteStream(newFileName));
    if (args[2] === 'true') {
      await rm(srcFileName);
      console.log(FILE_MOVED);
    } else {
      console.log(FILE_COPIED);
    }
  } catch (error) {
    console.error(OPERATION_FAILED, error.message);
  }
};

await copy();