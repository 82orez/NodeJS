import {odd, even} from './var.mjs';

const checkOddOrEven = (num) => {
  if (num % 2) {
    return odd;
  }
  return even;
}

// console.log(checkOddOrEven(1));
// console.log(checkOddOrEven(2));

export default checkOddOrEven;