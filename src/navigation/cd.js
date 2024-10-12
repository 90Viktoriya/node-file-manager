import { getPath } from '../utils/getPath.js';
import { access, constants } from 'node:fs/promises';

const cd = async (args) => {
  const path = getPath(args);
  try {
    await access(path, constants.R_OK);
    return path;
  } catch {
    console.error('Operation failed');
    return args[0];
  } 
}

export { cd }