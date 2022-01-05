const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "role", required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "team", required: true },
});

module.exports = mongoose.model("user", userSchema);
