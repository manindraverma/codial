module.exports.home=function(request,respond){
    return respond.end('<h1>Express is up for codial!</h1>')
}

module.exports.profile=function(request,respond){
    return respond.end('<p>My name is Manindra Verma</p>');
}