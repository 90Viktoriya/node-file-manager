
import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { homedir, EOL, hostname } from 'node:os';
import { fork } from 'node:child_process';
import { join, dirname } from 'node:path';

let currentDir = homedir();
const __dirname = import.meta.dirname;
const rl = readline.createInterface({ input: stdin, output: stdout });
rl.setPrompt(`You are currently in ${currentDir}${EOL}>`);
rl.prompt();
rl.on("SIGINT", function () {
  process.emit("SIGINT");
});
rl.on("line", (input) => {
  let child;
  let error = true;
  if (input.match('^up$')) {
    error = false;
    currentDir = dirname(currentDir);
    rl.setPrompt(`You are currently in ${currentDir}${EOL}>`);
  }
  if (input.startsWith('os ')) {
    const filename = join(__dirname, "os.js");
    child = fork(filename, input.split(' '));
  }
  if (input.startsWith('hash ')) {
    const filename = join(__dirname, "calcHash.js");
    child = fork(filename, [currentDir, input]);
  }
  if (input.startsWith('compress')) {
    console.log('Compress');
  }
  if (input.startsWith('decompress')) {
    console.log('Decompress');
  }
  if (child) {
    error = false;
    child.on('exit',()=>{
      rl.prompt();
    });
    child.on('error',()=>{
      rl.prompt();
    })
  } else {
    if (input.startsWith('.exit')) {
      process.exit();
    } else {
      if (error) {
        console.error('Invalid input');
       }
      rl.prompt();
    }
  }
  
});

process.on('SIGINT', () => {
  console.log(EOL);
  process.exit();
});