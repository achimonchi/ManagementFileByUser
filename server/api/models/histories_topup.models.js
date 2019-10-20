const mongoose = require("mongoose"),
  moment = require("moment");

const Histories_TopUpSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ht_code: {
    type: String,
    required: true
  },
  ht_information: {
    type: String,
    required: true
  },
  ht_created_at: {
    type: Number,
    default: moment().valueOf()
  },
  ht_status: {
    type: Number,
    required: true
  },
  ht_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  }
});

module.exports = mongoose.model("Histories_TopUp", Histories_TopUpSchema);
