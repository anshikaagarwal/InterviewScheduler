const { response } = require("express");
const mongoose = require("mongoose");
const interview = require("../models/interview");
const { findById, findOneAndUpdate, findByIdAndUpdate } = require("../models/interview");
const users_model = mongoose.model("users");
const interview_model = mongoose.model("interview")

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
function indexOf(arr, value) {
  for (let [i, e] of arr.entries()) {
    if (value.join() == e.join()) return i;
  }
  return -1;
}

function CheckOverlapping(user, date, starttime, endtime, res) {
  let schedule = user.schedule;
  console.log(schedule);
  schedule.forEach(time => {
    let userDate = time.shift();
    if (date == userDate) {
      let t = [time[0], time[1], starttime, endtime];
      t = t.map(tt => {
        let arr = tt.split(":").map(val => parseInt(val));
        return arr[0] + (arr[1] / 100);
      });
      if ((t[0] <= t[2] && t[1] >= t[2]) || (t[0] <= t[3] && t[1] >= t[3])) {
        console.log("clash time:", t);
        res.status(403).json({
          status: "fail",
          message: user.name + " has a time clash"
        })
      }
    }
  })
}

async function AddUserSchedule(participants, date, starttime, endtime) {
  await asyncForEach(participants, async id => {
    let user = await users_model.findOne({ email: id });
    user.schedule.push([date, starttime, endtime]);
    await users_model.findByIdAndUpdate(user._id, user)
  })
}

async function UpdateUserSchedule(participants, newTimings, prevTimings) {
  await asyncForEach(participants, async id => {
    let { _id, schedule } = await users_model.findOne({ email: id });
    schedule[indexOf(schedule, prevTimings)] = newTimings
    await users_model.findByIdAndUpdate(_id, { "schedule": schedule });
  })
}

module.exports = app => {
  app.post("/api/new-interview", async (req, res) => {
    const { name, participants, date, starttime, endtime } = req.body;
    console.log("new interview:", name, participants, date, starttime, endtime);
    if (participants.length < 2) {
      res.status(403).json({
        status: "fail",
        message: "Not less than two participants allowed"
      })
    }
    await asyncForEach(participants, async id => {
      let user = await users_model.findOne({ email: id });
      CheckOverlapping(user, date, starttime, endtime, res);
    })

    let new_interview = await new interview_model({ name, participants, date, starttime, endtime });
    await new_interview.save();

    await AddUserSchedule(participants, date, starttime, endtime);

    res.status(200).json({
      status: "success",
      message: "Interview is scheduled successfully"
    })
  })

  app.put("/api/update-interview", async (req, res) => {
    const { _id, name, participants, date, starttime, endtime } = req.body;
    console.log("update interview:", _id, name, participants, date, starttime, endtime);
    console.log("update:", req.body)
    if (participants.length < 2) {
      res.status(403).json({
        status: "fail",
        message: "Not less than two participants allowed"
      })
    }
    let interview = await interview_model.findById(_id);
    console.log("interview:", interview, interview.participants);
    let prevTimings = [interview.date, interview.starttime, interview.endtime];
    console.log("prevtime:", prevTimings)
    await asyncForEach(participants, async id => {
      let user = await users_model.findOne({ email: id });
      let schedule = user.schedule;
      schedule.splice(indexOf(schedule, prevTimings), 1);
      CheckOverlapping(user, date, starttime, endtime, res);
    })
    await interview_model.findByIdAndUpdate(interview._id, { date, starttime, endtime });
    await UpdateUserSchedule(participants, [date, starttime, endtime], prevTimings);
    res.status(200).json({
      status: "success",
      message: "Interview is updated successfully"
    })
  })

  app.get("/api/interview", async (req, res) => {
    console.log("get interview called");
    let interview = await interview_model.find();
    res.status(200).send({
      status: "success",
      data: interview
    });
  })
}