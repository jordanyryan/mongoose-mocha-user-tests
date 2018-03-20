const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  let joe, maria, alex, zach;
  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    maria = new User({name: 'Maria'});
    alex = new User({name: 'Alex'});
    zach = new User({name: 'Zach'});

    Promise.all([joe.save(), alex.save(), maria.save(), zach.save()])
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

  it('can skip and limit the result set', (done) => {
    User.find({})
    .sort({name: 1})
    .skip(1)
    .limit(2)
      .then(users=> {
        assert(users.length === 2);
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
        done();
      })
  });

});