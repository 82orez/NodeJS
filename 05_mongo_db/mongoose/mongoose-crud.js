const express = require('express');
const app = express();

// const  mongoose  = require('mongoose');
const { default: mongoose } = require('mongoose');

const Person = require('./person.model');
const morgan = require('morgan');

app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.set('port', process.env.PORT || 8080);

// mongoose.set('strictQuery', false); // Mongoose 7이상에서는 설정해줘야 경고가 뜨지 않음. -> 필요없는 메세지로 판단됨.

const mongodbUri = 'mongodb+srv://zero28:f6X5OZiy5avKlDWZ@cluster0.sr4vphp.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(mongodbUri)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(console.error);

app.get('/person', async (req, res) => {
  const person = await Person.find({});
  res.send(person);
});

app.get('/person/:email', async (req, res) => {
  const person = await Person.findOne({ email: req.params.email });
  res.send(person);
});

app.post('/person', async (req, res) => {
  // 방법 1.
  // const person = new Person(req.body);
  // await person.save();

  // 방법 2.
  const person = await Person.create(req.body);
  res.send(person);
});

app.put('/person/:email', async (req, res) => {
  const person = await Person.findOneAndUpdate({ email: req.params.email }, { $set: req.body }, { new: true });
  console.log(person);
  res.send(person);
});

app.delete('/person/:email', async (req, res) => {
  await Person.deleteMany({ email: req.params.email });
  res.send({ success: true });
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 서버 실행 중 ..');
});
