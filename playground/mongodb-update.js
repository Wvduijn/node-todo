const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  { useNewUrlParser: true },
  (err, client) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // Update one
    // db.collection('Todos')
    //   .findOneAndUpdate(
    //     {
    //       _id: new ObjectId('5c4e256da6cc34756e72fa57')
    //     },
    //     {
    //       $set: {
    //         completed: true
    //       }
    //     },
    //     {
    //       returnOriginal: false
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   });

    // updating name and incrementing age
    db.collection('Users')
      .findOneAndUpdate(
        {
          _id: new ObjectId('5c4e25d49513c075b866e353')
        },
        {
          $set: {
            name: 'Willem'
          },
          $inc: {
            age: -11
          }
        },
        {
          returnOriginal: false
        }
      )
      .then(result => {
        console.log(result);
      });

    // client.close();
  }
);
