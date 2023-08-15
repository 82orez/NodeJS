const encrypt = (data) => {
  return `encrypted ${data}`;
};

const send = (url, data) => {
  const encryptedData = encrypt(data);
  console.log(`${encryptedData} is being sent to ${url}`);
};

// default 값으로 내보내기.
// default 값으로 내보내면 불러오는 쪽에서 이름을 원하는대로 정할 수 있다.
module.exports = send;
