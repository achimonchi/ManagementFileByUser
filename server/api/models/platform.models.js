const
    mongoose = require('mongoose')

const platformSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    p_name : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Platforms', platformSchema)