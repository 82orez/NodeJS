const axios = require('axios');

axios
  .get('https://www.naver.com/')
  .then((re) => console.log(re.data))
  .catch((e) => console.error(e));
