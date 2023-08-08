const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.set('port', process.env.PORT || 8080);

app.use(cookieParser('secret@1234')); // 문자열 형태의 요청(req)의 cookies 를 JS 에서 쓰기 위해 객체화.

// sessionId 생성.
app.use(
  session({
    secret: 'secret@1234', // 암호화를 위한 비밀 key 설정.
    resave: false, // 새로운 요청시 session 에 변동사항이 없어도 다시 저장할지 설정.
    saveUninitialized: true, // session 에 저장할 내용이 없어도 저장할지 설정.
    // 세션 쿠키 옵션 들 설정 httpOnly, expires, domain, path, secure, sameSite
    cookie: {
      httpOnly: true, // 로그인 구현시 필수 적용, javascript 로 접근 할 수 없게 하는 기능.
    },
    // name: 'connect.sid' // 세션 쿠키의 Name 지정 default 가 connect.sid
  }),
);

app.get('/', (req, res) => {
  console.log(req.cookies);

  if (req.session.name) {
    const output = `
      <h2>Log in Success!</h2><br>
      <p>${req.session.name}</p>`;
    res.send(output);
  } else {
    const output = `  
                <h2>로그인하지 않은 사용자입니다.</h2><br>  
                <p>로그인 해주세요.</p><br>  
            `;
    res.send(output);
  }
});

// 실제 서비스에서는 post.
app.get('/login', (req, res) => {
  // ? 1. 쿠키를 사용할 경우 쿠키에 값 세팅
  // ? res.cookie(name, value, options)

  // * 2. 세션 쿠키를 사용할 경우
  req.session.name = 'TG';
  res.send('Login OK!');
});

app.get('/logout', (req, res) => {
  res.clearCookie('connect.sid');
  res.send('Logout OK!');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});

// http://localhost:8080/
// Sever 종료는 터미널에서 ctrl + C
