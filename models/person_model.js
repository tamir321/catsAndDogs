var mongoose  = require('mongoose')

var personSchema = mongoose.Schema({

    firstName: String,
    lastName: String,
    phoneNumber: Number,
    address: String,
});


module.exports = mongoose.model('Person',personSchema)