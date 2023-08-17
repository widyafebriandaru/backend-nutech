const uploadController = async (req, res) => {
  try {
    let finalImageURL =
      req.protocol +
      "://" +
      req.get("host") +
      "/uploads/" +
      req.file.filename;

    res.json({ image: finalImageURL });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = uploadController;
