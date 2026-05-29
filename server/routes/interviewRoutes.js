const express = require("express");

const router = express.Router();

const Interview = require("../models/Interview");


// SAVE INTERVIEW

router.post("/save", async (req, res) => {

  try {

    const interview = new Interview(req.body);

    await interview.save();

    res.status(201).json({

      success: true,

      message: "Interview Saved Successfully"

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

});


// GET HISTORY

router.get("/history", async (req, res) => {

  try {

    const history = await Interview.find();

    res.status(200).json(history);

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

});

module.exports = router;