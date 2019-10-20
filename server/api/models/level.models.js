const 
    mongoose    = require('mongoose')

const levelSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    l_name : {
        type : String,
        required : true
    },
    l_xp : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model('Level', levelSchema)