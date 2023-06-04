const https = require('https');
const fs = require('fs');

https
  .createServer(
    {
      key: fs.readFileSync('/Users/tglee/SSL/key.pem', 'utf-8'),
      cert: fs.readFileSync('/Users/tglee/SSL/cert.pem', 'utf-8'),
    },
    function (req, res) {
      res.write('Congrats! You made https server now :)');
      res.end();
    }
  )
  .listen(3001);

// * 파일을 실행하고 https://localhost:3001 로 접속하시면 브라우저의 url 창 왼쪽에 자물쇠가 잠겨있는 HTTPS 프로토콜을 이용한다는 것을 알 수 있습니다.
