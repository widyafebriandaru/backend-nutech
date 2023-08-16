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
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ error: "Nama barang sudah dipakai, coba nama lain"})
    } else {
      res.status(500).json({ msg: error.message });
    }
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

//GET SPECIFIC PRODUCT
const getProductById = async (req, res) => {
  try {
    const response = await db.product.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//UPDATE PRODUCT

const updateProduct = async (req, res) => {
  try {
    const product = await db.product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const {
      nama_barang,
      foto_barang,
      harga_beli,
      harga_jual,
      stok,
    } = req.body;
    if (req.accountType === "Admin") {
      await db.product.update(
        {
          nama_barang: nama_barang,
          foto_barang: foto_barang,
          harga_beli: harga_beli,
          harga_jual: harga_jual,
          stok: stok,
        },
        {
          where: {
            id: product.id,
          },
        }
      );
    } else {
      return res.status(403).json({ msg: "Akses terlarang" });
    }
    res.status(200).json({ msg: "Product updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await db.product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
    if (req.accountType === "Admin") {
      await db.product.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
        return res.status(403).json({ msg: "Anda bukan admin" });
    }
    res.status(200).json({ msg: "Product berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


module.exports = {
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  createProduct: createProduct,
  deleteProduct: deleteProduct,
  updateProduct: updateProduct,
};
