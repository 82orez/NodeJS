const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

// .env 파일을 읽어서 process.env 객체 생성.
// process.env.COOKIE_SECRET = cookieSecret;
// 옵션) .env 파일의 경로 추가 --> default 값은 root
dotenv.config({ path: `${__dirname}/.env` });
const app = express();

app.set('port', process.env.PORT || 8080);

// CSS, JS, image 파일과 같은 정적인 파일들을 관리하기 위한 static middleware.
// __dirname 는 현재 파일의 절대경로를 의미.
// public 이라는 하위 폴더에 정적 파일들을 모아 놓음.
// ? express.static 은 next 가 내장되어 있지 않기 때문에 순서가 중요.
app.use('/', express.static(`${__dirname}/public`));

// JSON 형태의 body 데이터를 객체 형태로 parsing.
// options: 객체뿐만 아니라 문자열도 parsing.
// 아래 미들웨어를 사용하지 않으면 undefined 를 반환.
app.use(express.json({ strict: false }));

// form 형태의 body 데이터를 객체 형태로 parsing.
// 예)'title=타이틀&name=이름&text=내용' => { title: '타이틀', name: '이름', text: '내용' }
// options: querystring 모듈이 아닌 qs 모듈 사용.
app.use(express.urlencoded({ extended: true }));

// Logger.
// 개발 모드: 'dev'
// 실제 배포시: 'combined'
app.use(morgan('dev'));

// 문자열 형태의 요청(req)의 cookies 를 JS 에서 쓰기 위해 객체화.
// 'name=TG' => {name: TG}
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    secret: process.env.COOKIE_SECRET, // 암호화를 위한 비밀 key 설정.
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
  res.sendFile(`${__dirname}/middleware.html`);

  if (req.cookies) {
    console.log('cookies: ', req.cookies);
  }

  if (req.session.name) {
    console.log('session: ', req.session);
  }
});

app.get('/login', (req, res) => {
  // ? 1. 쿠키를 사용할 경우 쿠키에 값 세팅
  // ? res.cookie(name, value, options)

  // * 2. 세션 쿠키를 사용할 경우
  req.session.name = 'session-cookie';
  res.send('Login OK!');
});

// 오류 처리 middleware.
app.use(
  (req, res, next) => {
    console.log('모든 요청에서 실행');
    next();
  },
  // 인위적으로 오류 발생시킴.
  (req, res, next) => {
    const error = new Error('미들웨어 실행 중 오류 발생');
    next(error);
  },
);

app.use((err, req, res, next) => {
  console.log(err);
  res.send('error...');
});

// port listening.
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

// http://localhost:8080/
// Sever 종료는 터미널에서 ctrl + C
