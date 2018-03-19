const assert = require('assert');
const User = require('../src/user');

describe('Update records', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
    .then(() => {
        User.find({})
          .then(users => {
            assert(users.length === 1 );
            assert(users[0].name === "Alex");
            done();
          })
      })
  }

  it('instance type set and save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('model instance can update', (done) => {
    assertName(joe.update({name: 'Alex'}), done);
  });

  it('a model class can update', (done) => {
    assertName(User.update({name: 'Joe'}, {name: 'Alex'}), done);
  });

  it('a model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}), done);
  });

  it('a model class can find a record with id and update', (done) => {
    assertName(User.findByIdAndUpdate({_id: joe._id}, {name: 'Alex'}), done);
  });

})