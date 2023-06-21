const express=require('express');

const router=express.Router();
const homeController= require('../controllers/home_controller');


router.get('/',homeController.home);

router.get('/profile',homeController.profile)

router.use('/users',require('./users'));
router.use('/posts',require('./post'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));
router.use('/reset-password',require('./resetPassword'));



router.use('/api', require('./api'))

console.log('router loaded successfully');



module.exports=router;