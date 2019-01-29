const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5c505ec9f43421c8424ef09d';

if (!ObjectID.isValid(id)) {
  console.log('This ID is not valid');
}

Todo.find({
  _id: id
}).then(todos => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id
}).then(todo => {
  console.log('Todo', todo);
});

Todo.findById(id)
  .then(todo => {
    console.log('Todo by ID', todo);
  })
  .catch(e => console.log(e));

User.findById().then(
  user => {
    if (!user) {
      console.log('User not found');
    }

    console.log(JSON.stringify(user, undefined, 2));
  },
  e => {
    console.log(e);
  }
);
