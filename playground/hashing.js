const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const brcrypt = require('bcryptjs');

// USING BCRYPT
var password = '123ABC!';

 brcrypt.genSalt(10, (err, salt) => {
     brcrypt.hash(password, salt, (err, hash) => {
         console.log(hash);
     })
 })

 var hashedpsw = '$2a$10$PCRi9dwqdjXYbq2McUAmx.lIf/KBjdzk15gMHddPxogZqaXPaGNJ2'

 brcrypt.compare(password, hashedpsw, (err, res) => {
     console.log(res);
 })



// JWT
// var data = {
//     id: 10
// };

// // creating a token
// var token = jwt.sign(data, 'secret');
// console.log(token);

// var decoded = jwt.verify(token, 'secret');
// console.log('decoded', decoded);


// MANUAL WAY 
// var message = 'I am super user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString();
// }

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not Trust!');
// }