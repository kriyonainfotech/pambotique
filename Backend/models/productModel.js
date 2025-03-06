const { DataTypes } = require('sequelize');
const Sequelize = require('./../config/db');

const Product = Sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  originalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  images: {
    type: DataTypes.JSON, // Use JSON to store multiple image URLs
    allowNull: true,
  }
}, {
  tableName: 'products',
  timestamps: true,
});

module.exports = Product;
