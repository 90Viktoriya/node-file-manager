import fs from 'node:fs/promises';
import { basename, join } from 'node:path';

const args = process.argv.slice(2);

const filenameArg = args[1].slice(args[1].indexOf(' ')).trim();
let filename = '';
if (basename(filenameArg) === filenameArg) {
  filename = join(args[0],filenameArg);
} else {
  console.error("\x1b[31mInvalid input:\x1b[0m", "I can create only in current working directory");
  process.exit();
}

const create = async () => {
  try {
    await fs.appendFile(filename, '', { flag: 'ax+' });
    console.log("\x1b[35mFile was created\x1b[0m");
  } catch (error) {
    console.error("\x1b[31mOperation failed:\x1b[0m", error.message);
  }
};

await create();