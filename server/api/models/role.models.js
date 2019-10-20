const 
    mongoose    = require('mongoose')

const roleSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    r_name : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Role', roleSchema)