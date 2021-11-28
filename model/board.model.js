const mongoose = require("mongoose");
const autoIncrementModelID = require('./counterModel');
const kanbanSchema = new mongoose.Schema({
   id: { type: Number, unique: true, min: 1 }, //increment by 1
  stage: {
    type: Number,
    default: 1,
  },
  title: {
    type: String,
    require: true,
  },
});
kanbanSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('activities', this, next);
});

mongoose.model("Kanban", kanbanSchema);
