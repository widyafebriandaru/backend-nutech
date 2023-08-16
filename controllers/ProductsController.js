const express = require("express");
const db = require("../models");
const { get } = require("../router/UploadRoutes");

//CREATE NEW PRODUCT

const createProduct = async (req, res) => {
  const { nama_barang, foto_barang, harga_beli, harga_jual, stok } = req.body;
  try {
    await db.product.create({
      nama_barang: nama_barang,
      foto_barang: foto_barang,
      harga_beli: harga_beli,
      harga_jual: harga_jual,
      stok: stok,
    });
    res.status(201).json({ msg: "Produk berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//GET ALL Products
const getAllProducts = async (req, res) => {
  try {
    const products = await db.product.findAll();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal server error " });
  }
};

module.exports = {
  createProduct: createProduct,
  getAllProducts: getAllProducts,
};
