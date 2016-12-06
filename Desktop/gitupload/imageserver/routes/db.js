var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/multibnb';

/**
 * connection
 */
mongoose.connect(DB_URL);

/**
  * connection success
  */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);  
});    

/**
 * connection error
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * disconnection
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});    

module.exports = mongoose;