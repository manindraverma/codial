module.exports.home=function(request,respond){
    // return respond.end('<h1>Express is up for codial!</h1>')
    console.log(request.Cookies);
  // respond.cookie('user_id',25);
    return respond.render('home',{
        title: 'Home'
    });
}

module.exports.profile=function(request,respond){
    return respond.end('<p>My name is Manindra Verma</p>');
}

//to check cookies in browser go to inspect-->application-->cookies ..now create a cookies and sent along the request