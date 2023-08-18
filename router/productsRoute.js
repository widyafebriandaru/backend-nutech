const express = require("express");
const {createProduct, getAllProducts, getProductById, deleteProduct, updateProduct, searchProducts} = require("../controllers/ProductsController");
const router = express.Router();
const { verifyUser, adminOnly } = require("../middleware/AuthUser");


router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.delete("/products/:id",verifyUser,adminOnly, deleteProduct );
router.patch("/products/:id", verifyUser, updateProduct);
router.get("/search", searchProducts);

module.exports = router;