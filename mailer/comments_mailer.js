const nodeMailer=require('../config/nodemailer')

//create a function which will send that mail
//this is another way of exporting a me
exports.newComment = (comment)=>{
    console.log("inside newComment mailer");


    //declare that we are using our mailer template
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/newMailer_comments.ejs')

    //when we  need to send a email
    nodeMailer.transporter.sendMail({
        from:"manindra301998@gmail.com",
        to:comment.user.email,
        subject:"new comment published",
       // html:"<h1>Yup!your Comment is now published!</h1>"
       html:htmlString
    },(err,info)/*info carry the information about the req that has been sent*/=>{
        if(err){
            console.log('Error in sending the mail',err);
            return;
        }

        console.log('Message Sent!',info);
        return;

    })
}