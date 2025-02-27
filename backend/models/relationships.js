// relationshipFile.js
const User = require('./userModel');
const Product = require('./productModel');
const Cart = require('./cartModel');
const Order = require('./orderModel');
const OrderItem = require('./orderItem');
const Category = require('./categoryModel');

// User-Product Relationships
User.hasMany(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

// Product Relationships
Product.hasMany(Cart, { foreignKey: 'productId', onDelete: 'CASCADE' });
Cart.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE' });

Product.hasMany(OrderItem, { foreignKey: 'productId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE' });

Product.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'CASCADE' });
Category.hasMany(Product, { foreignKey: 'categoryId', onDelete: 'CASCADE' });

// Order Relationships
Order.hasMany(OrderItem, { foreignKey: 'orderId', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', onDelete: 'CASCADE' });

module.exports = {
    User,
    Product,
    Cart,
    Order,
    OrderItem,
    Category,
};
