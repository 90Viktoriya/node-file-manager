import { homedir, EOL, cpus, userInfo } from 'node:os';

const args = process.argv.slice(2);

if (args[0] !== 'os' || args.length !== 2) {
  console.error('Invalid input');
  process.exit();
}
switch (args[1]) {
  case '--EOL':
    console.log(EOL);
    process.exit();
  case '--cpus':
    console.log(`Overall amount of CPUS: ${cpus().length}`);
    cpus().forEach(element => {
      console.log(element.model);
      console.log(element.speed);
    });
    process.exit();
  case '--homedir':
    console.log(homedir());
    process.exit();
  case '--username':
    console.log(userInfo().username);
    process.exit();
  case '--architecture':
    console.log(process.arch);
    process.exit();
  default:
    console.error('Invalid input');
    process.exit();
}