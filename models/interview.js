const mongoose = require("mongoose");
const { Schema } = mongoose;

const interview_schema = new Schema({
  name: String,  //name of the interview
  participants: Array, //email ID's of participants
  starttime: String,
  endtime: String
})

module.exports = mongoose.model("interview", interview_schema);