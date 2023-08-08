const encrypt = (data) => {
  return `encrypted ${data}`;
};

const send = (url, data) => {
  const encryptedData = encrypt(data);
  console.log(`${encryptedData} is being sent to ${url}`);
};

// default 값으로 내보내기.
module.exports = send;
