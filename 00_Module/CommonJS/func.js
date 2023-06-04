const { odd, even } = require('./var');

const checkOddOrEven = num => {
  if (num % 2) {
    return odd;
  }
  return even;
};

// console.log(checkOddOrEven(1));
// console.log(checkOddOrEven(2));

module.exports = checkOddOrEven;
