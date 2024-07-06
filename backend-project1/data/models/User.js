const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: String,
    account: { type: String, unique: true }, //unique 唯一键
    password: String,
    superior: String,
    type: String
  },
  { timestamps: true, versionKey: false }
)

module.exports = mongoose.models.User || mongoose.model("User", schema);
