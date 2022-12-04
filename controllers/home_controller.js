const Post=require('../models/post');
module.exports.home=function(request,respond){
    // return respond.end('<h1>Express is up for codial!</h1>')
//     console.log(request.Cookies);
//    respond.cookie('user_id',25);
// Post.find({},function(err,posts){
//     return respond.render('home',{
//         title: 'Home',
//         posts:posts
//     });
// }
// )
//here we are finding the post and than populating each user of the post and after this calling the call back function
    Post.find({}).populate('user').exec(function(err,posts){
        return respond.render('home',{
            title: 'Home',
            posts:posts
        });

    }
    )



   
}

module.exports.profile=function(request,respond){
    return respond.end('<p>My name is Manindra Verma</p>');
}

//to check cookies in browser go to inspect-->application-->cookies ..now create a cookies and sent along the request