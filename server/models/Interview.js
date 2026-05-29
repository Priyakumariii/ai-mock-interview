const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({

  field: {

    type: String,

    required: true

  },

  technicalScore: {

    type: Number,

    required: true

  },

  communicationScore: {

    type: Number,

    required: true

  },

  confidenceScore: {

    type: Number,

    required: true

  },

  date: {

    type: String,

    required: true

  }

});

module.exports = mongoose.model(

  "Interview",

  interviewSchema

);