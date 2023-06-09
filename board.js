const express = require('express');
const morgan = require('morgan');
const app = express();

app.set('port', process.env.PORT || 8080);

// JSON 형태의 body 데이터를 객체 형태로 parsing.
// options: 객체뿐만 아니라 문자열도 parsing.
// 아래 미들웨어를 사용하지 않으면 undefined 를 반환.
app.use(express.json({ strict: false }));

// form 형태의 body 데이터를 객체 형태로 parsing.
// 예)'title=타이틀&name=이름&text=내용' => { title: '타이틀', name: '이름', text: '내용' }
app.use(express.urlencoded({ extended: true }));

// Logger.
// 개발 모드: 'dev'
// 실제 배포시: 'combined'
app.use(morgan('dev'));

let posts = [];

app.get('/', (req, res) => {
  res.json(posts);
});

app.post('/posts', (req, res) => {
  const { title, name, text } = req.body;
  posts.push({ id: posts.length + 1, title, name, text, createdDt: Date() });
  res.json({ title, name, text });
});

app.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  const filteredPosts = posts.filter((post) => {
    // ! +id 는 문자열 id 를 숫자로 변환하는 것을 의미. parseInt 와 같은 의미.
    return post.id !== +id;
  });

  const isLengthChanged = posts.length !== filteredPosts.length;
  posts = filteredPosts;

  if (isLengthChanged) {
    res.json('OK');
    return;
  }
  res.json('Not changed');
});

// port listening.
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

// http://localhost:8080/
// Sever 종료는 터미널에서 ctrl + C
