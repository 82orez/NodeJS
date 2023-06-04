const http = require('http');

http
  .createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { 'Content-Type': 'text/html ;charset=utf-8', 'Set-Cookie': 'name=TG' });
    // console.log(req.headers.cookie);
    res.write('<h1>Node.js</h1>');
    res.end('<p>3장 http 모듈 공부중입니다.</p>');
  })
  .listen(8080, () => {
    console.log('Connecting...!');
  });

// http://localhost:8080/
// Sever 종료는 터미널에서 ctrl + C
