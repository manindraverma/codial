const express =require('express');
const router=express.Router();


const userController=require('../controllers/user_controller')

router.get('/about',userController.about);

router.get('/profile',userController.home);


router.get('/sign-in',userController.SignIn);
router.get('/sign-up',userController.SignUp);

router.post('/create',userController.create);

module.exports=router;