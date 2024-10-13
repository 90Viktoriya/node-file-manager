import { resolve, join, basename } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import stream from 'node:stream/promises';
import { getArgs } from '../utils/getArgs.js';
import { INVALID_INPUT, OPERATION_FAILED, INCORRECT_ARGS, INCORRECT_NAME, FILE_EXIST } from '../utils/constants.js';

const args = process.argv.slice(2);
const parsedArgs = getArgs(args[1], 2);

if (parsedArgs.length !== 2) {
  console.error(INVALID_INPUT, INCORRECT_ARGS);
  process.exit();
}

const copy = async () => {
  const srcFileName = resolve(args[0], parsedArgs[0]);
  const newFileName = join(resolve(args[0], parsedArgs[1]), basename(srcFileName));
  try {
    await stream.pipeline(createReadStream(srcFileName), createWriteStream(newFileName));
  } catch (error) {
    console.error(OPERATION_FAILED, error.message);
  }
};

await copy();