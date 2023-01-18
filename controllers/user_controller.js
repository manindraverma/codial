const User=require('../models/user');
module.exports.home=function(request,respond){
    // return respond.end('<h1>Express is up for codial!</h1>')

    User.findById(request.params.id,function(err,user){
        return respond.render('user_profile',{
            title: 'User Profile',
            profile_user: user
    });
 });
}

//update function
module.exports.update=function(request,respond){
//to check whether the logged  in user is updating only his/her own profile
if(request.user.id==request.params.id){
    User.findByIdAndUpdate(request.params.id,request.body,function(err,user){
        return respond.redirect('back');
    });
}
else{
    return respond.status(401).send('unauthorized');
}

}
module.exports.about=function(request,respond){
    return respond.end('<h1>User details are available here!</h1>');
}
//render the signUp page
module.exports.SignIn=function(request,respond){
    if(request.isAuthenticated()){
        return respond.redirect('/users/profile')
    }
    return respond.render('user_sign_in',{
        title: "coedial | SignIn"
    })
}
//render the signup page
module.exports.SignUp=function(request,respond){
    if(request.isAuthenticated()){
         return respond.redirect('/users/profile')
    }
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
    //this redirect to homepage
    //session will be created inside passport.js itself
    return res.redirect('/');
}

//
module.exports.destroySession=function(req,res,next){

    //before redirecting to homepage we need to logout from the session
    //logout function is given by passport.js to request
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect('/');
    }); 
  //  return res.redirect('/');
}