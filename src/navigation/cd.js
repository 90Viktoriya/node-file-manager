import { getPath } from '../utils/getPath.js';
import { access, constants, stat } from 'node:fs/promises';
import { OPERATION_FAILED, NOT_DIRECTORY } from '../utils/constants.js';

const cd = async (args) => {
  const path = getPath(args);
  try {
    await access(path, constants.R_OK);
    const result = await stat(path);
    if (result.isDirectory()) {
      return path;
    } else {
      throw new Error(NOT_DIRECTORY);
    }  
  } catch (error) {
    console.error(OPERATION_FAILED, error.message);
    return args[0];
  } 
}

export { cd }