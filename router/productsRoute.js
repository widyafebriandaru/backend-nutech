const express = require("express");
const {createProduct, getAllProducts, getProductById, deleteProduct, updateProduct} = require("../controllers/ProductsController");
const router = express.Router();
const { verifyUser, adminOnly } = require("../middleware/AuthUser");

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.delete("/products/:id",  deleteProduct );
router.patch("/products/:id", updateProduct);

module.exports = router;