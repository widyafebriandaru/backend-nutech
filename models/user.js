'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      length: 50,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      length: 50,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      length: 100,
      type: DataTypes.STRING
    },
    accountType: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },{
    sequelize,
    modelName: 'user',
    timestamps: true,
  });
  return user;
};