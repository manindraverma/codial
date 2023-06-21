const nodeMailer=require('../config/nodemailer')

//create a function which will send that mail
//this is another way of exporting a me
exports.newPasswordLink = (resetPasswordToken)=>{
    console.log("inside newComment mailer");
     console.log(resetPasswordToken.accessToken)


    //declare that we are using our mailer template
    let htmlString=nodeMailer.renderTemplate({resetPasswordToken:resetPasswordToken},'/resetPasswordToken/newMailer_resetPassword.ejs')
    
    console.log(resetPasswordToken)
    //when we  need to send a email
    nodeMailer.transporter.sendMail({
        from:"manindra301998@gmail.com",
        to:resetPasswordToken.user.email,
        subject:"Link for reset Password",
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