import fs from 'fs/promises';
import { getArgs } from '../utils/getArgs.js';


const args = process.argv.slice(2);
const parsedArgs = getArgs(args[1], 2);
console.log(parsedArgs);