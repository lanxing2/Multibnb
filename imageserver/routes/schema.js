var mongoose = require('../routes/db.js'),
    Schema = mongoose.Schema;

var carImageSchema = new Schema({          
    prefix : { type: String },                    
    path: {type: String},
    originalFilename: {type: String}
});


module.exports = {
    carImageModel:mongoose.model('carimage',carImageSchema,'carimage')
};
