import fs from 'fs/promises';
import { resolve, join, dirname, basename } from 'path';
import { getArgs } from '../utils/getArgs.js';
import { INVALID_INPUT, OPERATION_FAILED, INCORRECT_ARGS, INCORRECT_NAME, FILE_EXIST } from '../utils/constants.js';

const args = process.argv.slice(2);
const parsedArgs = getArgs(args[1], 2);

if (parsedArgs.length !== 2) {
  console.error(INVALID_INPUT, INCORRECT_ARGS);
  process.exit();
}

if (basename(parsedArgs[1]) !== parsedArgs[1]) {
  console.error(INVALID_INPUT, INCORRECT_NAME);
  process.exit();
} 

const rename = async () => {
  const srcFileName = resolve(args[0], parsedArgs[0]);
  const newFileName = join(dirname(srcFileName), parsedArgs[1]);
  try {
    const result = await fs.stat(newFileName);
    if (result.isFile) {
      throw new Error(FILE_EXIST);
    }
  } catch (error) {
    if (error.message !== FILE_EXIST) {
      try {
        await fs.rename(srcFileName, newFileName);
      }  catch (error) {
        console.error(OPERATION_FAILED, error.message);
      }
    } else {
      console.error(OPERATION_FAILED, FILE_EXIST);
    }
  }
 
};

await rename();