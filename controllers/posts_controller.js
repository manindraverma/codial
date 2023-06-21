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
        var post=await Post.create({
            //below helps to save the content coming from form into the Post
            content:req.body.content,
            user:req.user._id
    
        } );
        

        if(req.xhr){
            //remember we return json with status as below ,here status is successful  bcoz the post is created

            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
          //  post.user = await post.populate('user', 'name').execPopulate();
            console.log(post);
            post.user=req.user;
            return res.status(200).json({ 
                data:{
                    post:post
                },
                message:'Post created!'
            });
            
        }
        
        req.flash('success','Post Published');
        return res.redirect('back');
    }
    catch(err){
        
        req.flash('error',err);
           // console.log("error in creating a post");
           return res.redirect('back');
        
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

        
        if(req.xhr){
            //remember we return json with status as below ,here status is successful  bcoz the post is created
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:'Post deleted !'
            });

            
        }

        req.flash('success','Post and associated comments deleted'); 

        return res.redirect('back');
   }else{
    req.flash('error','You cannot delete this post');
    return res.redirect('back');

   }
   

}
catch(err){       
    
    req.flash('error',err);


    //console.log("Error",err);
    return res.redirect('back');
   }
}

//creating a route for mapping the form to the action