import { join, isAbsolute } from 'node:path';

const getPath = (args) => {
  const filenameArg = args[1].slice(args[1].indexOf(' ')).trim();
  let filename = '';
  if (isAbsolute(filenameArg)) {
    filename = filenameArg;
  } else {
    filename = join(args[0],filenameArg);
  }
  return filename;
}
export { getPath };
