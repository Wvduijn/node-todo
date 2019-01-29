const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // delete many
    db.collection('Todos').deleteMany({text: 'YOLO'}).then((result) => {
        console.log(result);
    })

    // Delete one - Only deletes one
    db.collection('Todos').deleteOne({text: 'YOLO'}).then((result) => {
        console.log(result);
    })


    // findOneAndDelete - deletes and returns deleted docuemnt
    db.collection('Todos').findOneAndDelete({text: 'YOLO'}).then((result) => {
        console.log(result);
    })

  // client.close();
});
