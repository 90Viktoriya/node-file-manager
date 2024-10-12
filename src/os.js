import { homedir, EOL, cpus, userInfo } from 'node:os';

const args = process.argv.slice(2);

if (args[0] !== 'os' || args.length !== 2) {
  console.error('\x1b[31mInvalid input\x1b[0m');
  process.exit();
}
switch (args[1]) {
  case '--EOL':
    console.log(EOL);
    process.exit();
  case '--cpus':
    console.log(`Overall amount of CPUS: \x1b[33m${cpus().length}\x1b[0m`);
    cpus().forEach(element => {
      console.log(element.model);
      console.log(element.speed);
    });
    process.exit();
  case '--homedir':
    console.log(`\x1b[33m${homedir()}\x1b[0m`);
    process.exit();
  case '--username':
    console.log(`\x1b[33m${userInfo().username}\x1b[0m`);
    process.exit();
  case '--architecture':
    console.log(`\x1b[33m${process.arch}\x1b[0m`);
    process.exit();
  default:
    console.error('\x1b[31mInvalid input\x1b[0m');
    process.exit();
}