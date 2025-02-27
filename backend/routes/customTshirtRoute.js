const express=require('express')
const router=express.Router()

const customTshirtController=require('../controllers/customTshirtController')
const adminAuth=require('../middlewares/authAdminMiddleware')


router.get('/getrequest',adminAuth,customTshirtController.getRequest)
router.post('/addrequest',customTshirtController.addRequest)
router.put('/editrequest/:id',customTshirtController.updateRequest)
router.delete('/deleterequest/:id',adminAuth,customTshirtController.deleteRequest)

module.exports=router