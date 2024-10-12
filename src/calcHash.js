import { createReadStream } from 'node:fs';
import { stdout } from 'node:process';
import { createHash } from 'node:crypto';
import { join, isAbsolute } from 'node:path';
import stream from 'node:stream/promises';
import { Transform } from 'node:stream';
import { EOL } from 'node:os';

const args = process.argv.slice(2);
console.log(args);
const filenameArg = args[1].slice(5);
let filename = '';
if (isAbsolute(filenameArg)) {
  filename = filenameArg;
} else {
  filename = join(args[0],filenameArg);
}

const calcHash = new Transform({
  transform(chunk, _, callback) {
    const hash = createHash('sha256');
    hash.update(chunk);
    callback(null, `${hash.digest('hex')}${EOL}`);
  },
});

const calculateHash = async () => {
  const hash = createHash('sha256');
  try {
    const input = createReadStream(filename);
    await stream.pipeline(input, calcHash, stdout)
  } catch {
    //throw new Error ('Operation failed');
    console.error('Operation failed');
    process.exit();
  }
};

await calculateHash();