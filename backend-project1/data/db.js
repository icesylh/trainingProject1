const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://liyux:chuwaBestTeam@recipe.mqzojkr.mongodb.net/ChuwaProject1", {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
mongoose.connection.on("connected", res => {
  console.log("connected");
});
mongoose.connection.on("error", err => {
  console.log("Mongoose connection error: " + err);
});



//mongodb://127.0.0.1:27017/b-cms
