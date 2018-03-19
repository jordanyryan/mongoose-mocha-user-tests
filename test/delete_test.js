const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    joe.save()
      .then(() => done());
  });

  function assertRemoved(operation, done) {
    operation
    .then(() => {
        User.findOne({name: 'Joe'})
      })
      .then((user) => {
        assert(!user)
        done();
      })
  }

  it('model instance remove', (done) => {
    assertRemoved(joe.remove(), done);
  });

  it('class method remove', (done) => {
    assertRemoved(User.remove({name: 'Joe'}), done)
  });

  it('class method findOneAndRemove', (done) => {
    assertRemoved(User.findOneAndRemove({name: 'Joe'}),done);
  });

  it('class method findByIdAndRemove', (done) => {
    assertRemoved(User.findByIdAndRemove(joe._id),done);
  });
});