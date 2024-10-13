import { join, isAbsolute } from 'node:path';

const getArgs = (args, count) => {
  let argsString = args.slice(args.indexOf(' ')).trim();
  const result = [];
  let index = argsString.indexOf('"');
  if (index === -1) {
    return argsString.split(' ');
  }
  while (index >= 0) {
    let arg = argsString.substring(0, argsString.indexOf('"')).trim();
    if (arg.trim()) {
      result.push(arg.trim());
    }
    const endIndex = argsString.indexOf('"', index + 2);
    if (endIndex >= 0) {
      arg = argsString.substring(index + 1, endIndex);
      if (arg.trim()) {
        result.push(arg.trim());
      } else return [];
      argsString = argsString.slice(endIndex + 1);
      index = argsString.indexOf('"');
    } else return [];
  }
  if (argsString.trim()) {
    result.push(argsString.trim());
  }
  if (result.length === count) {
    return result;
  }
  return []
}
  
export { getArgs };
