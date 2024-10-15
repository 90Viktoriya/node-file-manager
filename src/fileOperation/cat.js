import { createReadStream } from 'node:fs';
import stream from 'node:stream/promises';
import { stdout } from 'node:process';
import { getPath } from '../utils/getPath.js';
import { OPERATION_FAILED, FILE_CONTENT } from '../utils/constants.js';

const args = process.argv.slice(2);
const filename = getPath(args);

const read = async () => {
  try {
  const contents = createReadStream(filename);
  console.log(FILE_CONTENT);
  await stream.pipeline(contents, stdout, { end: false });
  } catch (error) {
    console.error(OPERATION_FAILED, error.message);
  }
};

await read();