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

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only JPG and PNG files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024, // 100KB in bytes
  },
  fileFilter: fileFilter,
});

router.post(`/api/upload`, upload.single("photo"), uploadController);
router.patch("/products/:id/image", upload.single("photo"), updateProductImage);
module.exports = router;
