require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGOURI);

mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo DB");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to Mongo DB ", err);
});

require("./model/board.model");
app.use(express.json());
app.use(require("./route/route"));
app.listen(process.env.PORT, () => {
  console.log(`Server is listening at ${process.env.PORT}`);
});
