//we need to add two models
const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
    //we need to create a comment over a post so first we need to find whether that post exists..for that we will find the post using the post id and than wiil create comment  after it
    Post.findById(req.body.post,function(err,post){
        //in above line req.body.post ...post is the name we have given in the home.ejs file to the input field which will return the post id in response
        //now if we find the post than we need to create the comment
        if(post){
            Comment.create({
                content:req.body.content,
                //since we found the post with same id
                post:req.body.post,
                user:req.user._id
            },
            function(err,comment){
                if(err){
                    console.log('error in creating comment'); return;}
                    //now we have created the comment and added the post id to the comment so after this we have to add the comment to the post

                    post.comments.push(comment); 
                    //whenever we update something we need to call save as it tells database that its final version so block before it is only in the ram
                    post.save();

                    res.redirect('/');

                

            })
        }

    })
}


module.exports.destroy=function(req,res){
    
    //need to find the comment whether it exist or not in the database before deleting it
    Comment.findById(req.params.id,function(err,comment){
        //we need to check whether the comment made by the user is same as the user who requested to delete it
        //
        if(comment.user==req.user.id){
            //before deleting the comment we need to fetch the id of the post in which the comment is made and than find the post and delete the comment from that
            let postId=comment.post;
            //once we get the postid from the comment ..we need to find that post and than from the comment array of that post delete the comment
            comment.remove();

            //$pull--pull out the comment id from the list of comment
            Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}},function(err,post){
                    return res.redirect('back');
            });

        }
        else{
            return res.redirect('back');
        }
    });
   
}