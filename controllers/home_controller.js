const Post=require('../models/post');
const Comment=require('../models/comment');
//need to import user inorder to use it
const User=require('../models/user');

//inorder to make the below codes much clear we asyn await method- for this we need to declare the function with async keyword as below bcos async keyword declare that this statement contain some async statement
//note without async also this function will work just to make the code clear we async await method
module.exports.home= async function(request,respond){
//     // return respond.end('<h1>Express is up for codial!</h1>')
// //     console.log(request.Cookies);
// //    respond.cookie('user_id',25);
// // return respond.render('home',{
// //             title: 'Home',
           
// //         });
// // Post.find({},function(err,posts){
// //     return respond.render('home',{
// //         title: 'Home',
// //         posts:posts
// //     });
// // }
// // )
// //here we are finding the post and than populating each user of the post and after this calling the call back function
//     Post.find({}).populate('user')
//     //below we are population comment and also the user of that comment
//     .populate({path:'comments',populate:{path:'user'}})
//     .exec(function(err,posts){

//         //get the list of all the users
//         User.find({},function(err,users){
//             return respond.render('home',{
//                 title: 'Home',
//                 posts:posts,
//                 //send all the user to user
//                 all_users:users
//         })

        
//         });

//     }
//     )

//below codes are used only for async await method
try{
    //first below codes will execute
let posts=await Post.find({}).populate('user')
//below we are population comment and also the user of that comment
.populate({path:'comments',populate:{path:'user'}})

//once the above statement executes completely than below will execute 

let users= await User.find({});

//if only the above 2 statement execution completes than only   below statement wiil be return as response
return respond.render('home',{
    title: 'Home',
    posts:posts,
    //send all the user to user
    all_users:users
})
}
catch(err){
    console.log("error",err);
    return;
}


   
}

module.exports.profile=function(request,respond){
    return respond.end('<p>My name is Manindra Verma</p>');
}

//to check cookies in browser go to inspect-->application-->cookies ..now create a cookies and sent along the request