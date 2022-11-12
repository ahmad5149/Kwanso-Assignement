const mongoose = require("mongoose");

const task = new mongoose.Schema({
  name: { type: String },
});

module.exports = mongoose.model("task", task);
