const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
});

module.exports = mongoose.model("team", teamSchema, "team");
