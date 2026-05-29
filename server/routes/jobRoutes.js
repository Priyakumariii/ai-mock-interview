const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

router.post("/add", async (req, res) => {

  try {

    const { title, company, location, salary } = req.body;

    const newJob = new Job({
      title,
      company,
      location,
      salary,
    });

    await newJob.save();

    res.status(201).json({
      message: "Job Added Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

router.get("/", async (req, res) => {

  try {

    const jobs = await Job.find();

    res.status(200).json(jobs);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

router.delete("/:id", async (req, res) => {

  try {

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

});

module.exports = router;