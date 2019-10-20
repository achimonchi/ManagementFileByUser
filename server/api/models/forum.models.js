const
    mongoose    = require('mongoose'),
    moment      = require('moment')

const forumSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    f_title : {
        type : String,
        required : true
    },
    f_question : {
        type : String,
        required : true 
    },
    f_created_at : {
        type : Number,
        default : moment().valueOf()
    },
    f_user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
        required : true
    },
    f_category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Categories",
        required : true 
    }
})

module.exports = mongoose.model('Forums', forumSchema)
