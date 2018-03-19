const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');
mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (err) => {
    console.warn('Warning', err)
  });

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  })
})