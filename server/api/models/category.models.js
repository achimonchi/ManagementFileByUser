const 
    mongoose    = require('mongoose')

const categorySchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    c_name : {
        type : String,
        required : true
    },
    c_platform : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Platforms"
    }
})

module.exports = mongoose.model('Categories', categorySchema)