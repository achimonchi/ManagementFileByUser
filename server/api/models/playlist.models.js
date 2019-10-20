const 
    mongoose    = require('mongoose')

const playlistSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    pl_name : {
        type : String,
        required : true
    },
    pl_status : {
        type : Number,
        default : 0
    },
    pl_price : {
        type : Number,
        required : true
    },
    pl_platform : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Platforms",
        required : true
    },
    pl_category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Categories",
        required : true
    },
    pl_user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Users",
        required : true
    }
})

module.exports = mongoose.model('Playlists', playlistSchema)