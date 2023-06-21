const express =require('express');
const router=express.Router();
const passport=require('passport');

const resetPasswordContorller=require('../controllers/resetPasswordController');



router.post('/findUser',resetPasswordContorller.resetPasswordToken);
router.get('/',resetPasswordContorller.setPasswordPage);
router.post('/',resetPasswordContorller.setPasswordMethod);

module.exports=router;