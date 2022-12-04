const express =require('express');
const router=express.Router();

//need to import the controller to get the action 
const postController=require("../controllers/posts_controller");
//now we can access all the action exported in the post controller
//so to access we use below lines
router.post('/create',postController.create);

module.exports=router;

//to make the above created route to be usable we need to call it from index.js
