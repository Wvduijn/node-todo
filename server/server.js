require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');

const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

// App routes
const app = express();
// Set port
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST
app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

// GET
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

// GET /todos/:id - Individual Todo by :id
app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  // validate id with is Valid
  if (!ObjectID.isValid(id)) {
    // 404 - send back empty body
    return res.status(404).send();
    console.log('This ID is not valid');
  }

  // findbyId
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  })
    .then(todo => {
      // success
      // if no todo - send back 404 and empty body
      if (!todo) {
        return res.status(404).send();
      }
      // if todo - send it back
      return res.send({ todo });
    })
    .catch(e => {
      // error
      // 400 - and send empt body
      return res.status(400).send(e);
    });
});

// DELETE todo
app.delete('/todos/:id', authenticate, (req, res) => {
  // get the id
  var id = req.params.id;
  // validate id with is Valid
  if (!ObjectID.isValid(id)) {
    // 404 - send back empty body
    return res.status(404).send();
    console.log('This ID is not valid');
  }
  // remove todo by id
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  })
    .then(todo => {
      // success
      // if no todo - send back 404 and empty body
      if (!todo) {
        res.status(404).send();
      }
      // if todo - send it back
      res.send({ todo });
    })
    .catch(e => {
      // error
      // 400 - and send empty body
      return res.status(400).send(e);
    });
});

// UPDATE ITEM
app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  // validate id with is Valid
  if (!ObjectID.isValid(id)) {
    // 404 - send back empty body
    return res.status(404).send();
    console.log('This ID is not valid');
  }
  // set CompletdAt timstamp
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // query the db
  Todo.findOneAndUpdate(
    {
      _id: id,
      _creator: req.user._id
    },
    { $set: body },
    { new: true }
  )
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(e => {
      return res.status(400).send();
    });
});

// USERS
// POST USER
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(e => {
      return res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login { email, password }
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      // generate Authentication token
      return user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user);
      });
    })
    .catch(e => {
      return res.status(400).send();
    });
});

// LOGOUT THE USER
app.delete('users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(
    () => {
      res.status(200).send();
    },
    () => {
      res.status(400).send();
    }
  );
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

module.exports = { app };
