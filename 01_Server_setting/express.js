const express = require('express');
const morgan = require('morgan');
const app = express();

// JSON 형태의 body 데이터를 parsing.
// 객체뿐만 아니라 문자열도 parsing.
app.use(express.json({ strict: false }));

// form 형태의 body 데이터를 parsing.
// querystring 모듈이 아닌 qs 모듈 사용.
app.use(express.urlencoded({ extended: true }));

// Logger.
// 개발 모드: 'dev'
// 실제 배포시: 'combined'
app.use(morgan('dev'));

// CSS, JS, image 파일과 같은 정적인 파일들을 관리하기 위한 static middleware.
// __dirname 는 현재 파일의 절대경로를 의미.
// public 이라는 하위 폴데에 정적 파일들을 모아 놓음.
app.use(express.static(`${__dirname}/public`));

app.set('port', process.env.PORT || 8080);

app.get('/', (req, res) => {
  // http 모듈의 fs 모듈 대신 sendfile 을 사용.
  // sendfile 을 사용하면 'Content-Type' 같은 자질구레한 정보를 자동으로 클라이언트에게 보내줌.
  res.sendFile(`${__dirname}/express.html`);
});

app.get('/user/:id', (req, res) => {
  //문자열로 응답.
  res.send(`${req.params.id}'s Personal Homepage!`);
});

app.listen(8080, () => {
  console.log(`Number ${app.get('port')} Port Connecting...!`);
  console.log(__dirname);
  console.log(__filename);
});

// http://localhost:8080/
// Sever 종료는 터미널에서 ctrl + C
