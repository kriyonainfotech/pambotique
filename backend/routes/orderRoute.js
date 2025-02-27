const express=require('express')
const router=express.Router()
const orderController=require('../controllers/orderController')
const adminAuth=require('../middlewares/authAdminMiddleware')


router.post('/create',orderController.createOrder)
router.get('/getorders',adminAuth,orderController.getAllOrders)
router.put('/manageorder/:id',adminAuth,orderController.updateOrderStatus)
router.delete('/deleteorder/:id',adminAuth,orderController.deleteOrder)

// Example using Express.js
// router.put('updatestatus/:id', async (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;
//     try {
//       // Update the order status in the database
//       await Order.update({ status }, { where: { id } });
//       res.status(200).send({ message: 'Order status updated successfully' });
//     } catch (error) {
//       console.log(error);
//       res.status(500).send({ message: 'Error updating order status' });
//     }
//   });
  

module.exports=router;