const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItem');
const Product = require('../models/productModel');
const Cart=require('../models/cartModel')

// Create a new order
const createOrder = async (req, res) => {
  const {
    userId,
    firstName,
    lastName,
    addressLine1,
    addressLine2,
    addressLine3,
    city,
    state,
    country,
    zipCode,
    paymentMethod,
    phoneNumber,
    email,
    items,// Array of items [{ productId, quantity, price }]
  } = req.body;
  
console.log("data",req.body)


  if (!firstName || !lastName || !addressLine1 || !city || !state || !country || !zipCode || !paymentMethod || !items || items.length === 0) {
    return res.status(400).json({ message: 'All fields are required and items should not be empty.' });
  }
  const totalPrice = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

  try {
    // Create a new order
    const newOrder = await Order.create({
      userId,
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      addressLine3,
      city,
      state,
      country,
      zipCode,
      paymentMethod,
      totalPrice,
    });

    const orderItems = items.map((item) => ({
        orderId: newOrder.orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));
  
      await OrderItem.bulkCreate(orderItems);
      await Cart.destroy({ where: { userId } });
  
      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create order', error });
    }
};
// Get order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id, {
      include: [{ model: OrderItem }], // Include order items
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch order', error });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: 
      [
        { 
          model: OrderItem ,
          include:[
            {
              model:Product,
              attributes:['name','price']
            }
          ]
        }
      ], // Include order items

    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
};

const updateOrderStatus=async (req,res)=>{
  const { id } = req.params;
  const { status } = req.body;
  try {
    // Update the order status in the database
    await Order.update({ status }, { where: { orderId:id } });
    res.status(200).send({ message: 'Order status updated successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Error updating order status' });
  }
}

// Delete an order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await Order.destroy({ where: { orderId: id } });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete order', error });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
