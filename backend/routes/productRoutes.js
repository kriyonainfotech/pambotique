const express=require('express')
const router=express.Router()
const productController=require('./../controllers/productController')
const upload=require('./../middlewares/uploadMiddleware')
const adminAuth=require('../middlewares/authAdminMiddleware')


router.post('/addproduct',adminAuth,productController.addProducts)
router.get('/getproducts',productController.getProducts)
// router.get('/getfilteredproduct',productController.getFilteredProducts)
router.put('/editproduct/:productId',upload.array('images', 4),adminAuth,productController.updateProduct)
router.delete('/deleteproduct/:productId',adminAuth,productController.deleteProduct)

module.exports=router
