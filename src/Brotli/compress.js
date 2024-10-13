import { createReadStream, createWriteStream } from 'node:fs';
import stream from 'node:stream/promises';
import { createBrotliCompress } from 'node:zlib';
import { resolve} from 'node:path';
import { getArgs } from '../utils/getArgs.js';
import { OPERATION_FAILED, INVALID_INPUT, INCORRECT_ARGS, FILE_COMPRESSED } from '../utils/constants.js';

const args = process.argv.slice(2);
const parsedArgs = getArgs(args[1], 2);

if (parsedArgs.length !== 2) {
  console.error(INVALID_INPUT, INCORRECT_ARGS);
  process.exit();
}

const compress = async () => {
   try {
    const srcFileName = resolve(args[0], parsedArgs[0]);
    const newFileName = resolve(args[0], parsedArgs[1]);
    const brotliCompress = createBrotliCompress();
    await stream.pipeline(createReadStream(srcFileName), brotliCompress, createWriteStream(newFileName));
    console.log(FILE_COMPRESSED);
  } catch (error) {
    console.log(OPERATION_FAILED, error.message);
    process.exit();
  }
};

await compress();