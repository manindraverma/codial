const User=require('../models/user');
module.exports.home=function(request,respond){
    // return respond.end('<h1>Express is up for codial!</h1>')
//check in cookies if user id is present ,if it is present than go with below lines
    if(request.cookies.user_id){
        //find the user using the user id present in cookies
        User.findById(request.cookies.user_id,function(err,user){
            //if user is found than redirect to profile page 
            if(user){
                return respond.render('user_profile',{
                    title: 'User Profile',
                    user:user
                });
            }
            //if user  is not found using the id than redirect to sign-in page
            return respond.redirect('/users/sign-in');
        });
    }
    else{
        return respond.redirect('/users/sign-in');
    }
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

    //steps to authenticate
    //find the user
    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error in finding user in sign in'); return}
        //handle user found

        if(user){
            //handle password which doesn't match
            if(user.password!=req.body.password){
                return res.redirect('back');
            }

            //handle session creation

            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }else{
                //handle user not found

                return res.redirect('back');
        }
    });
}

module.exports.deletesession=function(request,respond){
   //steps to authenticate
    //find the user
    // id=request.query.id;
    // User.findByIdAndDelete(id,function(err,user){
    //     //if user is found than redirect to profile page 
    //     // if(user){
    //     //     respond.clearCookies(user.cookies.user_id);
    //     //     return respond.redirect('/users/sign-in');
    //     // }
    //     // //if user  is not found using the id than redirect to sign-in page
    //     return respond.redirect('back');
    // });
           
}
    
