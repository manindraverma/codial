const express =require('express');
const router=express.Router();
const passport=require('passport');


const userController=require('../controllers/user_controller')

router.get('/about',userController.about);

//we want to make the profile page only accessible when the user is signed in so we will add passport.setAuthentication middleware once  if authentication is checked than only profile page is visible
router.get('/profile/:id',passport.checkAuthentication,userController.home);
router.post('/update/:id',passport.checkAuthentication,userController.update);




router.get('/sign-in',userController.SignIn);
router.get('/sign-up',userController.SignUp);

router.post('/create',userController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),userController.createSession);

//destroy session 
router.get('/sign-out',userController.destroySession);

module.exports=router;