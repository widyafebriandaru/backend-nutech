'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nama_barang: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,},
    foto_barang: {
      type: DataTypes.STRING,
      allowNull: false},
    harga_beli: {
      type: DataTypes.INTEGER,
      allowNull: false},
    harga_jual: {
      type: DataTypes.INTEGER,
      allowNull: false},
    stok: {
      type: DataTypes.INTEGER,
      allowNull: false}
  }, {
    sequelize,
    timestamps: true,
    modelName: 'product',
  });
  return product;
};