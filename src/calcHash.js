import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
import { createHash } from 'node:crypto';
import stream from 'node:stream/promises';
import { Transform } from 'node:stream';
import { EOL } from 'node:os';
import { getPath } from './utils/getPath.js';

const args = process.argv.slice(2);
const filename = getPath(args);

const calcHash = new Transform({
  transform(chunk, _, callback) {
    const hash = createHash('sha256');
    hash.update(chunk);
    callback(null, `\x1b[33m${hash.digest('hex')}\x1b[0m${EOL}`);
  },
});

const calculateHash = async () => {
  const hash = createHash('sha256');
  try {
    const input = createReadStream(filename);
    await stream.pipeline(input, calcHash, stdout)
  } catch (error) {
    console.log("\x1b[31mOperation failed:\x1b[0m", error.message);
    process.exit();
  }
};

await calculateHash();