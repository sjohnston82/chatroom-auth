const mongoose = require("mongoose");

const Message = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: String,
  },
  room: {
    type: String,
  },
  timePosted: {
    type: Date,
  },
});

module.exports = mongoose.model("Message", Message);
