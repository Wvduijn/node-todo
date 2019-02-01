var env = process.env.NODE_ENV || 'development';
console.log('env ****', env);

if (env === 'development' || env === 'test'){
 var config = require('./config.json');
 var envConfig = config[env];

 Object.keys(envConfig).forEach((key) => {
  process.env[key] = envConfig[key];
 });
}
// } else {
//     process.env.MONGODB_URI = 'mongodb://pixelbender:PixelBender1@ds141720.mlab.com:41720/todoappnode';
// }

