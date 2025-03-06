const express=require('express')
const router=express.Router()
const cartController=require('./../controllers/cartController')
const isAuthenticated=require('./../middlewares/authmiddleware')

router.post('/addtocart',isAuthenticated,cartController.addToCart)
router.get('/getcart/:userId',isAuthenticated,cartController.getCart)
router.delete('/removeitem/:id',isAuthenticated,cartController.deleteCartItem)
router.put('/updatequantity/:id',isAuthenticated,cartController.updateCartQuantity)

module.exports=router;