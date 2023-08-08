import { odd, even } from './var.mjs';
import checkOddOrEven from './func.mjs';
import checkNumber from '../CommonJS/func.js';

const checkStringOddOrEven = (num) => {
  if (num % 2) {
    return odd;
  }
  return even;
};

console.log(checkNumber(1));
console.log(checkOddOrEven(2));
console.log(checkStringOddOrEven('hello'));
