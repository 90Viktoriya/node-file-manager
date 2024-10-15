import { createReadStream, createWriteStream } from 'node:fs';
import stream from 'node:stream/promises';
import { resolve} from 'node:path';
import { createBrotliDecompress } from 'node:zlib';
import { getArgs } from '../utils/getArgs.js';
import { OPERATION_FAILED, INVALID_INPUT, INCORRECT_ARGS, FILE_DECOMPRESSED } from '../utils/constants.js';

const args = process.argv.slice(2);
const parsedArgs = getArgs(args[1], 2);

if (parsedArgs.length !== 2) {
  console.error(INVALID_INPUT, INCORRECT_ARGS);
  process.exit();
}

const decompress = async () => {
  try {
    const srcFileName = resolve(args[0], parsedArgs[0]);
    const newFileName = resolve(args[0], parsedArgs[1]);
    const brotliDecompress = createBrotliDecompress();
    await stream.pipeline(createReadStream(srcFileName), brotliDecompress, createWriteStream(newFileName));
    console.log(FILE_DECOMPRESSED);
  } catch (error) {
    console.log(OPERATION_FAILED, error.message);
    process.exit();
  }
};

await decompress();