const mongoose = require("mongoose");

const metricsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  workedTickets: { type: String, required: true },
  workedHours: { type: String, required: true },
  year: { type: String, required: true },
  month: { type: String, required: true },
  team: { type: String, required: true },
  weekEndingDay: { type: String, required: true },
  plannedUnits: { type: String, required: true },
  availableTime: { type: String, required: true },
  verifiedTickets: { type: String, required: true },
  rejectedTickets: { type: String, required: true },
  user: { type: String, required: true },
});

module.exports = mongoose.model("metric", metricsSchema);
