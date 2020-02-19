var mongoose  = require('mongoose')

var ownerSchema = mongoose.Schema({

    personId: String,
    catId: String,
    dogId: String


});


module.exports = mongoose.model('Owner',ownerSchema)