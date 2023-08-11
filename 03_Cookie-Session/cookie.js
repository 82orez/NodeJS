const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// 문자열 형태의 요청(req)의 cookies 를 JS 에서 쓰기 위해 객체화(req.cookies).
app.use(cookieParser());

// signed 옵션을 사용하는 사용하는 경우에는 매개변수에 비밀키를 넣어주어야 한다.
// 그리고 req.signedCookies 를 통해 접근할 수 있다.
// app.use(cookieParser('1234'));

app.set('port', process.env.PORT || 8080);

// 요청에 쿠키가 없으면 새로운 응답에 새로운 쿠키 정보를 담아 보낸다.
app.get('/', (req, res) => {
  if (req.cookies) {
    console.log(req.cookies);
    // console.log(req.signedCookies);
  }
  res.cookie('name', 'TGLee', {
    // expires 옵션 설정에 따라 영속성 쿠키와 세션 쿠키로 구분됨.
    // expires: new Date(Date.now() + 9000000),
    httpOnly: true,
    secure: true,
    // signed: true,
  });
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
