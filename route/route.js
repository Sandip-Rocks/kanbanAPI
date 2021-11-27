const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Kanban = mongoose.model("Kanban");


router.get("/allboards", async (req, res) => {
  try{
    await Kanban.find()
      .then((boards) => {
        res.status(200).json({ boards });
      })
  }
    catch(err) {
     res.json({"Error":`${err}`}) 
    };
});


router.post("/createboard", async (req, res) => {
  const { stage, title } = req.body;
  if (!title) {
    return res.status(422).json({ error: "Plase add the title of the Board" });
  }
  const board = new Kanban({
    stage,
    title,
  });
  try {
    board.save().then((result) => {
      res.status(201).json({ board: result });
    });
  } catch (err) {
    console.log(err);
  }
});


router.put("/board/:id", async (req, res) => {
  try {
    const board = await Kanban.findById(req.params.id);
    board.stage = req.body.stage;
    console.log(req.body.stage);
    if (req.body.stage == 1 || req.body.stage == 2 || req.body.stage == 3) {
      const a1 = await board.save();
      res.json(a1);
    }
     else {
      throw Error("Kindly update the stage value to 1,2 or 3");
    }
  } catch (err) {
    res.status(400).json(`${err}`);
  }
});


module.exports = router;
