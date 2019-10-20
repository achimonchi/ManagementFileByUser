const 
    mongoose = require("mongoose"),
    moment = require("moment");

const 
    replies_ForumSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  rf_reply: {
    type: String,
    required: true
  },
  rf_created_at: {
    type: Number,
    default: moment().valueOf()
  },
  rf_forum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Forums",
    required: true
  },
  rf_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  }
});

module.exports = mongoose.model("Replies_Forum", replies_ForumSchema);