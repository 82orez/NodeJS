// * Node.js 에서 주 모듈 관리 방법은 CommonJS.
// 파일 확장자 생략 가능.
// 폴더의 index.js 파일은 파일 자체를 생략 가능.

const { odd, even } = require('./var');
const checkNumber = require('./func');

const checkStringOddOrEven = num => {
  if (num % 2) {
    return odd;
  }
  return even;
};

console.log(checkNumber(1));
console.log(checkStringOddOrEven('hello'));
