const mongoose = require('mongoose');

// mongoose 를 사용해서 Schema 인스턴스를 생성하고 모델을 만든다.
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// console.log(personSchema);
module.exports = mongoose.model('Person', personSchema);
