const path = require("path");
const db = require("../models");

const uploadController = (req, res) => {
  // save filename nya ke database
  // return url ke user

  let finalImageURL =
    req.protocol +
    "://" +
    req.get("host") +
    "/uploads/" +
    req.file.filename;

  res.json({ image: finalImageURL });
};

module.exports = uploadController;
