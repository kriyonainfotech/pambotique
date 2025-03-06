const express = require('express');
const router = express.Router();
const productController = require('./../controllers/productController');
const upload = require('./../middlewares/uploadMiddleware');
const adminAuth = require('../middlewares/authAdminMiddleware');

// Route to add a product (admin-only access)
router.post('/addproduct', adminAuth, productController.addProducts);

// Route to get all products
router.get('/getproducts', productController.getProducts);

// Route to edit a product (admin-only access, with image upload)
router.put('/editproduct/:productId', upload.array('images', 4), adminAuth, productController.updateProduct);

// Route to delete a product (admin-only access)
router.delete('/deleteproduct/:productId', adminAuth, productController.deleteProduct);

module.exports = router;
