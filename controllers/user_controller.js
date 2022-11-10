module.exports.home=function(request,respond){
    // return respond.end('<h1>Express is up for codial!</h1>')

    return respond.render('user_profile',{
        title: 'User Profile'
    });
}
module.exports.about=function(request,respond){
    return respond.end('<h1>User details are available here!</h1>');
}