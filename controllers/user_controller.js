const User=require('../models/user');
module.exports.home=function(request,respond){
    // return respond.end('<h1>Express is up for codial!</h1>')

    return respond.render('user_profile',{
        title: 'User Profile'
    });
}
module.exports.about=function(request,respond){
    return respond.end('<h1>User details are available here!</h1>');
}
//render the signUp page
module.exports.SignIn=function(request,respond){
    return respond.render('user_sign_in',{
        title: "coedial | SignIn"
    })
}
//render the signup page
module.exports.SignUp=function(request,respond){
    return respond.render('user_sign_up',{
        title: "coedial | SignUp"
    })
}

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){ 
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in sign up'); return}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating  user while sign up'); return}
            return res.redirect('/users/sign-in');

        });
        
        }else{
            return res.redirect('back');
        }
    });
}
 

//sign IN  and create a session for the user
module.exports.createSession=function(req,res){
    //todo later
}