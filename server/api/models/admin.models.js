const 
    mongoose    = require('mongoose'),
    moment      = require('moment')

const adminSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    a_name : {
        type : String,
        required : true
    },
    a_email : {
        type : String,
        required : true,
        unique : true,
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    a_password : {
        type : String,
        required : true
    },
    date : {
        type : Number,
        default : moment().valueOf()
    },
    a_role : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Role",
        required : true
    }
})

module.exports = mongoose.model('Admin', adminSchema)