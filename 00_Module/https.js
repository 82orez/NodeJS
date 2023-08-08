// 아래처첨 default 값으로 가져오는 경우 이름을 변경해도 됨.
const sendChanged = require('./request');

// ! 하지만 아래처럼 구조분해할당으로 가져오는 것이 좀 더 직관적임.
// response.js 파일에서 read 함수를 가져온다. 
const { read } = require('./response');

const makeRequest = (url, data) => {
  // 요청 보내기
  sendChanged(url, data);
  // 복호화 한 data 리턴하기
  return read();
};

makeRequest('hello', 'Hi');
