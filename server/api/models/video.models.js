const   
    mongoose    = require('mongoose'),
    moment      = require('moment')

const videoSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    v_title : {
        type : String,
        required : true
    },
    v_name  :{
        type : String,
        required : true
    },
    v_size : {
        type : Number,
        required : true
    },
    v_created_at : {
        type : Number,
        default : moment().valueOf()
    },
    v_playlist : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Playlists",
        required : true
    }
})

module.exports = mongoose.model('Videos', videoSchema)