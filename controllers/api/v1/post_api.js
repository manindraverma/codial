const Post=require('../../../models/post');
const Comment=require('../../../models/comment')
module.exports.index=async function(req,res){
    //whenever we want to return json data

    let posts=await Post.find({})
//sort and display the latest post on the top 
.sort('-createdAt')
.populate('user')
//below we are population comment and also the user of that comment
.populate({path:'comments',populate:{path:'user'}})
    return res.json(200,{
        message:'List of posts',
        posts:posts
    })
}

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
   // if(post.user == req.user.id){
        post.remove();
        //delete all comments based on some queries passed
        await Comment.deleteMany({post:req.params.id});

        
        // if(req.xhr){ ----we can skip sending this part
        //     //remember we return json with status as below ,here status is successful  bcoz the post is created
        //     return res.status(200).json({
        //         data:{
        //             post_id:req.params.id
        //         },
        //         message:'Post deleted !'
        //     });

            
        // }

        // req.flash('success','Post and associated comments deleted'); 

        //return res.redirect('back');
        return res.json(200,{
            message: "Post and associated commented deleted successfully"
        })
//    }else{
//     req.flash('error','You cannot delete this post');
//     return res.redirect('back');

//    }
   

}
catch(err){       
    
    //req.flash('error',err); -->this is of no use here bcoz it is an api call


    //console.log("Error",err);
    
    //return res.redirect('back');

    console.log('****',err);
    return res.json(500,{
        message:'Internal server Error'
    })
   
   }
}