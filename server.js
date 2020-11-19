const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
require("./models/interview");
const users = require("./models/users")

const mongoURI = "mongodb+srv://anshika:anshikaagrawal@cluster0.e3jar.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("mongodb connected")).catch((err) => console.log("err in mongodb connection:", err));

const app = express();
// app.use(cors)
app.use(express.json());
require("./routes/schedule")(app);
app.listen(5000, () => console.log("server connected"));


if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


