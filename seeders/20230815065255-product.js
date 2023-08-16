"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "products",
      [
        {
          nama_barang: "kertas",
          foto_barang: "tes",
          harga_beli: 100.0,
          harga_jual: 200.0,
          stok: 50,
        },
        {
          nama_barang: "Pena",
          foto_barang: "tes",
          harga_beli: 100.0,
          harga_jual: 200.0,
          stok: 50,
        },
        {
          nama_barang: "Pensil",
          foto_barang: "tes",
          harga_beli: 100.0,
          harga_jual: 200.0,
          stok: 50,
        },
        {
          nama_barang: "Penghapus",
          foto_barang: "tes",
          harga_beli: 100.0,
          harga_jual: 200.0,
          stok: 50,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('products', null, {});
  },
};
