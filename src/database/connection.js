const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://apiConcrete:08808008@cluster0-j3qic.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`connected mongodb!`)
});

module.exports = db
