//remember middleware has three argument 
//to take out the flash messages from req and put it into the response we created this  or pass this messages to ejs template we created this middleware
module.exports.setFlash=function(req,res,next){
    //here we will find out the flash from the req and set it up in the locals of the response and we will access the locals in the template

     //which fetches everything from request flash and put it into locals
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('err')
    }
    next();
}