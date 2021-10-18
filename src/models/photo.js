const mongoose = require("../db/db");

const photoSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
});

const Photo = new mongoose.model("Photo", photoSchema);

module.exports = Photo;
