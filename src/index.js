import { argv } from 'node:process';
import { fork } from 'node:child_process';
import { join } from 'node:path';

const fileManager = () => {
  const __dirname = import.meta.dirname;
  const filename = join(__dirname, "main.js");
  const userNameArg = argv.filter((value,) => value.match('^(--username)'))[0] || '';
  const userName = userNameArg.slice(userNameArg.indexOf('=') + 1);
  console.log(`Welcome to the File Manager, ${userName}!`);
  const child = fork(filename);
  child.on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  });
}

fileManager();