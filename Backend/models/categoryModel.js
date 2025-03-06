// categoryModel.js
const { DataTypes } = require('sequelize');
const Sequelize = require('./../config/db');

const Category = Sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'categories',
  timestamps: true,
});

module.exports = Category;
