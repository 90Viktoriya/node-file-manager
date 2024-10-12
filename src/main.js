
import readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { homedir, EOL, hostname } from 'node:os';
import { fork } from 'node:child_process';
import { join, dirname } from 'node:path';
import { cd } from './navigation/cd.js';

let currentDir = homedir();
const __dirname = import.meta.dirname;
const rl = readline.createInterface({ input: stdin, output: stdout });
function changePrompt(rl, currentDir) {
  rl.setPrompt(`\x1b[32mYou are currently in \x1b[33m${currentDir}${EOL}\x1b[35m>\x1b[0m`);
}
changePrompt(rl, currentDir);
rl.prompt();
rl.on("SIGINT", function () {
  process.emit("SIGINT");
});
rl.on("line", async (input) => {
  let child;
  let error = true;
  if (input.match('^up$')) {
    error = false;
    currentDir = dirname(currentDir);
    changePrompt(rl, currentDir);
  }
  if (input.startsWith('cd ')) {
    error = false;
    const result = await cd([currentDir, input]);
    currentDir = result;
    changePrompt(rl, currentDir);
  }
  if (input.match('^ls$')) {
    const filename = join(__dirname, "navigation", "list.js");
    child = fork(filename, [currentDir]);
  }
  if (input.startsWith('cat ')) {
    const filename = join(__dirname, "fileOperation", "cat.js");
    child = fork(filename, [currentDir, input]);
  }
  if (input.startsWith('add ')) {
    const filename = join(__dirname, "fileOperation", "add.js");
    child = fork(filename, [currentDir, input]);
  }
  if (input.startsWith('rn ')) {
    const filename = join(__dirname, "fileOperation", "rn.js");
    child = fork(filename, [currentDir, input]);
  }
  if (input.startsWith('cp ')) {
    const filename = join(__dirname, "fileOperation", "cp.js");
    child = fork(filename, [currentDir, input]);
  }
  if (input.startsWith('mv ')) {
    const filename = join(__dirname, "fileOperation", "mv.js");
    child = fork(filename, [currentDir, input]);
  }
  if (input.startsWith('rm ')) {
    const filename = join(__dirname, "fileOperation", "rm.js");
    child = fork(filename, [currentDir, input]);
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
        console.log("\x1b[31mInvalid input:\x1b[0m");
       }
      rl.prompt();
    }
  }
  
});

process.on('SIGINT', () => {
  console.log(EOL);
  process.exit();
});