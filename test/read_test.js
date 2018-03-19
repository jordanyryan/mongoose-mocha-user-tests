const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    joe.save()
      .then(() => done());
  });

  it('Finds all users with name of joe', (done) => {
    User.find({name: 'Joe'})
      .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString())
        done();
      });
  });

  it('Finds one user with a particular id', (done) => {
    User.findById(joe._id)
      .then(user => {
        assert(user._id.toString() === joe._id.toString() && user.name === joe.name);
        done()
      })
  });

});