const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  uploadController,
  updateProductImage, deleteImage,
} = require("../controllers/UploadImageController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post(`/api/upload`, upload.single("photo"), uploadController);
router.patch("/products/:id/image", upload.single("photo"), updateProductImage);
module.exports = router;
