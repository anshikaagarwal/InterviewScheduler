const mongoose = require("mongoose");
const { Schema } = mongoose;

const user_schema = new Schema({
  name: String,
  email: String,
  schedule: Array  //array of timings of all the invited interviews
});

module.exports = mongoose.model("users", user_schema);