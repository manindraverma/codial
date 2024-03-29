const express =require('express');
const router=express.Router();
const passport=require('passport');

//need to import the controller to get the action 
const commentsController=require("../controllers/comments_controller");
//now we can access all the action exported in the post controller
//so to access we use below lines
router.post('/create',passport.checkAuthentication, commentsController.create);
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);

module.exports=router;

//to make the above created route to be usable we need to call it from index.js
