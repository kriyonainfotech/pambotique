  // orderItemModel.js
  const { DataTypes } = require('sequelize');
  const Sequelize = require('./../config/db');
  const Order = require('./orderModel');
  const Product = require('./productModel');

  const OrderItem = Sequelize.define('OrderItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'orders',
        key: 'orderId',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
  },

  }, {
    tableName: 'order_items',
    timestamps: true,
  });


  module.exports = OrderItem;
