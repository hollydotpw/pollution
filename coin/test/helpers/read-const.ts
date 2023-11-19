import * as fs from 'fs';
import path from 'path';

const constantRegex = /(uint|bytes)([\d]+) constant ([\w_]+) = ([\d\w *]+);/gi;

let constants: Map<string, bigint>;

export default function readConst(key: string): bigint {
  if (!constants) {
    const constantsFile = fs.readFileSync(path.join(__dirname, '../../contracts/Constants.sol'), 'utf8');
    const declarations = Array.from(constantsFile.matchAll(constantRegex));
    const declarations2mapEntries = declarations.map<[string, bigint]>(([line, type, size, key, value]) => ([key, BigInt(value)]));
  
    constants = new Map(declarations2mapEntries);
  }
  
  return constants.get(key) as bigint;
}
