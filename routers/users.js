const express =require('express');
const router=express.Router();


const userController=require('../controllers/user_controller')

router.get('/about',userController.about);

router.get('/profile',userController.home);


router.get('/sign-in',userController.SignIn);
router.get('/sign-up',userController.SignUp);

router.post('/create',userController.create);

router.post('/create-session',userController.createSession);
//router.get('/deletesession',userController.deletesession);

module.exports=router;