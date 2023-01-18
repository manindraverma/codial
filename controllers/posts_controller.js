//here we are writing an action which will get the data comming from the form and store into the database
const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.create=async function(req,res){
    // //we will create below a new post from the data in the form
    // Post.create({
    //     //below helps to save the content coming from form into the Post
    //     content:req.body.content,
    //     user:req.user._id

    // },function(err,post){
    //     if(err)
    //     {
    //         console.log("error in creating a post");
    //         return;
    //     }
    //     return res.redirect('back');
    // })

    //using async and await method to reduce the clutterness of the code
    try{
        await Post.create({
            //below helps to save the content coming from form into the Post
            content:req.body.content,
            user:req.user._id
    
        } );
        return res.redirect('back');
    }
    catch(err){
        
        
            console.log("error in creating a post");
            return;
        
    }
    

}

//deleting a post
module.exports.destroy=async function(req,res){
    // //we need to find whether post is there in database or not
    // Post.findById(req.params.id,function(err,post){
    //     //we need to check the user who written the post is the only one who is deleting it
    //     //post.user is the id of the user 
    //     //.id means converting the object id into string
    //     //here we are comparing 2 object id so we need to convert it into string
    //     if(post.user == req.user.id){
    //         post.remove();
    //         //delete all comments based on some queries passed
    //         Comment.deleteMany({post:req.params.id},function(err){
    //             return res.redirect('back');
    //         });

    //     }
    //     else{
    //         return res.redirect('back');
    //     }
    // })
    //using async and await method to reduce code clutterness and make it more readable
   try{
    let post =await Post.findById(req.params.id);
    //we need to check the user who written the post is the only one who is deleting it
    //post.user is the id of the user 
    //.id means converting the object id into string
    //here we are comparing 2 object id so we need to convert it into string
    if(post.user == req.user.id){
        post.remove();
        //delete all comments based on some queries passed
        await Comment.deleteMany({post:req.params.id});
        return res.redirect('back');
   }
   

}
catch(err){
    console.log("Error",err)
   }
}

//creating a route for mapping the form to the action