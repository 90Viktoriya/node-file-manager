import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { OPERATION_FAILED } from '../utils/constants.js';

const srcDir = process.argv.slice(2)[0];
const directories = [];
const files = [];
try {
  const allFiles = await readdir(srcDir);
  const results = allFiles.map(async(file) => {
  await stat(join(srcDir, file)).then((result) => {
    if (result.isFile()) {
      files.push(file);
    }
    if (result.isDirectory()) {
    directories.push(file)
  }
})
});
const result = await Promise.all(results);

console.table([...directories.sort().map((item) => ({Name: item, Type: 'directory'})), ...files.map((item) => ({Name: item, Type: 'file'}))]);
} catch (error) {
  console.error(OPERATION_FAILED, error.message)
}

