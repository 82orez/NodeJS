const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  res.send('Hello World!');

  // * 응답을 여기에서 끝내지 말고 다음 미들웨어로 넘어가라.
  next();
});

const myLogger = (req, res, next) => {
  console.log(`http request is "${req.method}", url is "${req.url}"`);
  // next();
};
app.use(myLogger);

app.listen(8080, () => {
  console.log('Connecting...!');
});

// http://localhost:8080/
// Sever 종료는 터미널에서 ctrl + C
