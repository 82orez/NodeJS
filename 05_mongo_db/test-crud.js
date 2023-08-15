const { MongoClient } = require('mongodb');
// Replace the uri string with your MongoDB deployment's connection string.
const uri = 'mongodb+srv://zero28:f6X5OZiy5avKlDWZ@cluster0.sr4vphp.mongodb.net/?retryWrites=true&writeConcern=majority';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('MongoDB access succeed.');

    const collection = client.db('test').collection('person');

    await collection.insertOne({ name: 'Andy', age: 30 });
    console.log('문서 추가 완료');

    const documents = await collection.find({ name: 'Andy' }).toArray();
    console.log('찾은 문서: ', documents);

    await collection.updateMany({ name: 'Andy' }, { $set: { age: 31 } });
    console.log('Document updated.');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
