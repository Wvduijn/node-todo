var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
require('dotenv').config({path: './../variables.env'});

var { Todo } = require('./models/todo');
var { User } = require('./models/user');

// App routes
var app = express();
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
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
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
    Todo.findById(id).then((todo) => {
        // success
        // if no todo - send back 404 and empty body
        if(!todo){
            res.status(400).send();
        }
         // if todo - send it back
        res.send({todo});
    }, (e) => {
        // error
        // 400 - and send empt body
        res.status(400).send(e);
    });

});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

module.exports = {app};