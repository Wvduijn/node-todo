var env = process.env.NODE_ENV || 'development';

if (env === 'development'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if(env ==='test'){
  process.env.PORT = 3000
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
} else {
    process.env.MONGODB_URI = 'mongodb://pixelbender:PixelBender1@ds141720.mlab.com:41720/todoappnode';
}

