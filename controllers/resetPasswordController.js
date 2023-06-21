const User=require('../models/user');
const ResetPasswordToken=require('../models/resettoken');
const crypto = require('crypto');
const resetpasswordMailer=require('../mailer/resetPassword_mailer')





module.exports.resetPasswordToken=async function(req,res){
   
       
try{

    let user=await User.findOne({email:req.body.email});
 
    if(!user){
        console.log("invalid email Id");
         return res.redirect('back');
         }
   else{
        let resetPassword=await  ResetPasswordToken.create({
           accessToken:crypto.randomBytes(10).toString('binary'),
           user:user._id,
           isValid:true
       });
       resetPassword=await resetPassword.populate('user','name email');
       resetpasswordMailer.newPasswordLink(resetPassword);
       console.log("Hi the  data is loaded successfully!");
       return res.redirect('back');
   }
   

}catch(err){
     
      req.flash('error', err);
      return res.redirect('back');
    }
    

        // //console.log(user.name);
        // console.log('db is not working');
        // return res.redirect('back');
}

//render the new password page
module.exports.setPasswordPage=function(req,res){
   // console.log(req.query.accessToken)
   let id=req.query.accessToken;

   let setToken=ResetPasswordToken.find({accessToken:id},function(err,token){
    if(err){
        console.log('Error',err);
        return;
    }
    return res.render('reset_password',{
        title:'reset Password',
        token:token
    })

   })
    // console.log(setToken);
    // return res.render('reset_password',{
    //     title:'reset Password',
    //     accessToken:req.query.accessToken
    // })
}



module.exports.setPasswordMethod=async function(req,res){
   let setPassword=await ResetPasswordToken.findOne({accessToken:req.body.accessToken});
   console.log(setPassword);

   return res.redirect('back')

}