const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const uploadController = async (req, res) => {
  try {
    let finalImageURL =
      req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;

    res.json({ image: finalImageURL });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE PRODUCT IMAGE

const updateProductImage = async (req, res) => {
  try {
    const product = await db.product.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    if (!req.file) {
      return res.status(400).json({ msg: "No image file provided" });
    }

    const finalImageURL =
      req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;

    // Update the product's foto_barang field with the new image URL
    await db.product.update(
      {
        foto_barang: finalImageURL,
      },
      {
        where: {
          id: product.id,
        },
      }
    );

    res.status(200).json({ msg: "Product image updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


module.exports = {
  uploadController: uploadController,
  updateProductImage: updateProductImage,
};
