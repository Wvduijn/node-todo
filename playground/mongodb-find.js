const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
 const db = client.db('TodoApp');


 // find() returns all itens in collection
 // add query to return selected docs
 db.collection('Todos').find({
   _id: new ObjectId('5c4e25d49513c075b866e352')
  }).count().then((count) => {
  console.log(`Todos count: ${count}`);
 }, (err) => {
  console.log('Unable to fetch todos', err);
 })

  // client.close();
});
