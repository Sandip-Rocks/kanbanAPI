const mongoose = require("mongoose");
const kanbanSchema = new mongoose.Schema({
  stage: {
    type: Number,
    default: 1,
  },
  title: {
    type: String,
    require: true,
  },
});

mongoose.model("Kanban", kanbanSchema);
