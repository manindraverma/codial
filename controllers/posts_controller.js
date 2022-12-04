//here we are writing an action which will get the data comming from the form and store into the database
const Post=require('../models/post');

module.exports.create=function(req,res){
    //we will create below a new post from the data in the form
    Post.create({
        //below helps to save the content coming from form into the Post
        content:req.body.content,
        user:req.user._id

    },function(err,post){
        if(err)
        {
            console.log("error in creating a post");
            return;
        }
        return res.redirect('back');
    })

}

//creating a route for mapping the form to the action