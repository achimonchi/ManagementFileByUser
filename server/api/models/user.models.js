const 
    mongoose    = require('mongoose'),
    moment      = require('moment')

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    u_name : {
        type : String,
        required : true
    },
    u_email : {
        type : String,
        required : true, 
        unique : true,
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    u_password : {
        type : String,
        required : true,
    },
    u_contact : {
        type : String,
        required : true
    },
    u_address : {
        type : String,
        default : ""
    },
    u_gender : {
        type : String,
        required : true
    },
    u_coin : {
        type : Number,
        default : 0
    },
    u_xp : {
        type : Number,
        default : 0
    },
    date : {
        type : Number,
        default : moment().valueOf()
    }

})

module.exports = mongoose.model('Users', userSchema)