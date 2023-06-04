const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser()); // 문자열 형태의 요청(req)의 cookies 를 JS 에서 쓰기 위해 객체화.

app.set('port', process.env.PORT || 8080);

app.get('/', (req, res) => {
  if (req.cookies) {
    console.log(req.cookies);
  }
  res.cookie('name', 'TGLee');
  res.send('Hello World');
});

app.get('/logout', (req, res) => {
  res.clearCookie('name');
  console.log(req.cookies);
  res.send('Logout OK!');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});

// http://localhost:8080/
// Sever 종료는 터미널에서 ctrl + C
