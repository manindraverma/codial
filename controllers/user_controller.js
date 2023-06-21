const User = require('../models/user');
const fs=require('fs');
const path= require('path');



//lets keep it as same as before
module.exports.home = function (request, respond) {
    // return respond.end('<h1>Express is up for codial!</h1>')

    User.findById(request.params.id, function (err, user) {
        return respond.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });
}

//update function
module.exports.update = async function (request, respond) {
    //to check whether the logged  in user is updating only his/her own profile
    // if (request.user.id == request.params.id) {
    //     User.findByIdAndUpdate(request.params.id, request.body, function (err, user) {
    //         req.flash('success','Updated!');
    //         return respond.redirect('back');
    //     });
    // }
    // else {
    //     req.flash('error','Unauthorized');
    //     return respond.status(401).send('unauthorized');
    // }
    if (request.user.id == request.params.id) {
 try{
    
        let user = await User.findById(request.params.id);
        User.uploadedAvatar(request,respond,function(err){
            if(err){
                console.log('*****Multer Error:',err); }
//since the request contain the file so we print req.file
          //  console.log(req.file);
          user.name= request.body.name;
          user.email= request.body.email;

          if(request.file){

            if( user.avatar){
                fs.unlinkSync(path.join(__dirname,'..', user.avatar));
            }
            //this is saving the path of the uploaded file into the avatar field in the user
            user.avatar=User.avatarPath + '/' +request.file.filename;
            console.log('file Loaded');
          }
          user.save();
          return respond.redirect('back');

        });
     }
 
 catch(err){
    request.flash('error',err);


    //console.log("Error",err);
    return respond.redirect('back'); 
 }
}
    else {
        request.flash('error','Unauthorized');
        return respond.status(401).send('unauthorized');
    }

}
module.exports.about = function (request, respond) {
    return respond.end('<h1>User details are available here!</h1>');
}
//render the signIn page
module.exports.SignIn = function (request, respond) {
    if (request.isAuthenticated()) {
        return respond.redirect('/users/profile')
    }
    return respond.render('user_sign_in', {
        title: "coedial | SignIn"
    })
}
//render the signup page
module.exports.SignUp = function (request, respond) {
    if (request.isAuthenticated()) {
        return respond.redirect('/users/profile')
    }
    return respond.render('user_sign_up', {
        title: "coedial | SignUp"
    })
}

//get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({ email: req.body.email }, function (err, user) {
        // if (err) { console.log('error in finding user in sign up'); 
        {
        req.flash('error', err);
        return }

        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {  //console.log('error in creating  user while sign up');return 
                    req.flash('error', err);}
                return res.redirect('/users/sign-in');

            }
            );

        } else {
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    }
    );
}


//sign IN  and create a session for the user
module.exports.createSession = function (req, res) {
    //setting .up the flash message
    req.flash('success', 'logged in successfully ');
    //this redirect to homepage
    //session will be created inside passport.js itself
    return res.redirect('/');
}

//
module.exports.destroySession = function (req, res, next) {

    //before redirecting to homepage we need to logout from the session
    //logout function is given by passport.js to request
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        //setting .up the flash message
        req.flash('success', 'You have logged out ');
        res.redirect('/');
    });
    //  return res.redirect('/');
}

//render the forgetPassword page
module.exports.forgetPassword = function (request, respond) {
    // if (request.isAuthenticated()) {
    //     return respond.redirect('/users/profile')
    // }
    return respond.render('forget_password', {
        title: "coedial | Forget-password"
    })
}



