const express = require('express');
const app = express();

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const jwt = require('jsonwebtoken');

// .env 파일을 읽어서 process.env 객체 생성.
// .env 파일 안에 COOKIE_SECRET = cookieSecret;
// 옵션) .env 파일의 경로 추가 --> default 값은 root
dotenv.config({ path: `${__dirname}/.env` });

app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(cookieParser());

const arrRefreshTokens = ['good'];

const posts = [
  {
    username: 'John',
    title: 'Post1',
  },
  {
    username: 'Park',
    title: 'Post2',
  },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  // payload 생성.(userInfo)
  const userInfo = { username };

  // Token 생성하기. (payload + secretKey)
  const accessToken = jwt.sign(userInfo, process.env.JWT_KEY, { expiresIn: '30s' });
  // 원래는 요청 헤의 Authorization 으로 보내지만, 여기에서는 편의상 아래처럼 처리함.

  const refreshToken = jwt.sign(userInfo, process.env.REFRESH_JWT_KEY, { expiresIn: '1d' });
  //refreshToken 을 DB 에 저장.
  arrRefreshTokens.push(refreshToken);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.json({ accessToken });
});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // token 이 없으면 오류 메세지 보내기.
  if (!token) {
    // console.log(token)
    return res.sendStatus(401); // 'Unauthorized'
  }
  // token 이 있으면 유효성 검사하기.
  jwt.verify(token, process.env.JWT_KEY, (err) => {
    if (err) return res.sendStatus(403); // 'Forbidden'

    // 토큰이 승인되면 payload 부분(userInfo)을 다음 번 미들웨어에서 쉡게 사용할 수 있게 처리함.
    // req.userInfo = userInfo;

    next();
  });
};

app.get('/posts', authMiddleware, (req, res) => {
  return res.json(posts);
});

app.get('/refresh', (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) return res.sendStatus(401);

  const refreshToken = cookies.refreshToken;

  // refreshToken 이 DB 에 저장되어 있는 토큰인지를 확인.
  if (!arrRefreshTokens.includes(refreshToken)) return res.sendStatus(403);
  // return res.send('hello');

  // refreshToken 이 유효한 토큰인지 확인.
  jwt.verify(refreshToken, process.env.REFRESH_JWT_KEY, (err) => {
    if (err) return res.sendStatus(403);

    // 새로운 accessToken 을 생성.
    const accessToken = jwt.sign({}, process.env.JWT_KEY, { expiresIn: '30s' });

    res.json({ accessToken });
  });
});

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});

// http://localhost:8080/
// Sever 종료는 터미널에서 ctrl + C
