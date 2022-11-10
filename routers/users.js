const express =require('express');
const router=express.Router();


const userController=require('../controllers/user_controller')

router.get('/about',userController.about);

router.get('/profile',userController.home);
module.exports=router;