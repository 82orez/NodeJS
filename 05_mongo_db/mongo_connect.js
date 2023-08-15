const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb+srv://zero28:f6X5OZiy5avKlDWZ@cluster0.sr4vphp.mongodb.net/?retryWrites=true&w=majority';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // admin( ) 메서드로 admin DB 의 인스턴스를 생성.
    const adminDB = client.db('test').admin();

    // adminDB 인스턴스의 listDatabases() 메서도로 admin DB 의 데이터베이스 정보 가져오기.
    // admin 과 local 은 기본적으로 생성되어 있는 DB 입니다.
    const listDatabases = await adminDB.listDatabases();
    console.log(listDatabases);

    return 'OK';
  } catch (e) {
    console.error(e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().then(console.log);
