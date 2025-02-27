const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const adminAuth=require('../middlewares/authAdminMiddleware')


router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.post('/logout',userController.logout)
router.get('/getUser',adminAuth,userController.getUsers)

module.exports=router