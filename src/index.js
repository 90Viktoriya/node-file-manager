import { argv } from 'node:process';
import { fork } from 'node:child_process';
import { join } from 'node:path';

const fileManager = () => {
  const __dirname = import.meta.dirname;
  const filename = join(__dirname, "main.js");
  const userNameArg = argv.filter((value,) => value.match('^(--username)'))[0] || 'Stranger';
  const userName = userNameArg.slice(userNameArg.indexOf('=') + 1);
  console.log(`\x1b[32mWelcome to the File Manager, \x1b[33m${userName}\x1b[32m!\x1b[0m`);
  const child = fork(filename);
  child.on('close', () => {
    console.log(`\x1b[32mThank you for using File Manager, \x1b[33m${userName}\x1b[32m, goodbye!\x1b[0m`);
  });
}

fileManager();