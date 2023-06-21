const User=require('../../../models/user');
const jwt=require('jsonwebtoken');
const env=require('../../../config/environment')


//sign IN  and create a session for the user
module.exports.createSession =async function (req, res) {
   //whenever user name and password is received we need to find that user and generate a webtoken corresponding to that user

  try{
    let user=await User.findOne({email:req.body.email});
//if we have found the user
if(!user || user.password!=req.body.password){
    return res.json(422,{
        message:'Invalid userName or Password',
       
    });


}

return res.json(200,{
    message:"Sign in successful, here is your token,please keep it safe",
     //token is stored in the data
     data:{
        //token to be returned
        // token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'10000'})

        //we are using below lines instead of above commented line bcoz we are using development environment
        token:jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn:'10000'})
    }
})


  }catch(err){
    console.log('****',err);
    return res.json(500,{
        message:'Internal server Error'
    })
   
  }

   
}