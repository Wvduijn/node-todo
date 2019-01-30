require('./config/config')

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');

const { Todo } = require('./models/todo');
const { User } = require('./models/user');

// App routes
const app = express();
// Set port
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
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
app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    e => {
      res.status(400).send(e);
    }
  );
});

// GET /todos/:id - Individual Todo by :id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  // validate id with is Valid
  if (!ObjectID.isValid(id)) {
    // 404 - send back empty body
    return res.status(404).send();
    console.log('This ID is not valid');
  }

  // findbyId
  Todo.findById(id)
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
      // 400 - and send empt body
      res.status(400).send(e);
    });
});

// DELETE todo
app.delete('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id;
  // validate id with is Valid
  if (!ObjectID.isValid(id)) {
    // 404 - send back empty body
    return res.status(404).send();
    console.log('This ID is not valid');
  }
  // remove todo by id
  Todo.findByIdAndRemove(id)
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
      res.status(400).send(e);
    });
});

// UPDATE ITEM
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  // validate id with is Valid
  if (!ObjectID.isValid(id)) {
    // 404 - send back empty body
    return res.status(404).send();
    console.log('This ID is not valid');
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // query the db
  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({ todo });
    })
    .catch(e => {
      res.status(400).send();
    });
});


app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

module.exports = { app };
