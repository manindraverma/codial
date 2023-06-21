const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path')

//this transporter is the part which is responsible to sent the email so this is the part which defines how the communication is going to take place



// let transporter=nodemailer.createTransport(
//     {
//     service:'gmail',
//     host:'smtp.google.com',
//     port:587,
//     secure:false,
//     //the authentication-that is to establish  the identity with which we  will be sending that email bcoz if we dont establish the identity anyone can use gmail to send the email from anyone to anyone so we need to establish the identity so that gmail tracks our activity and if we are misusing the mails than gmail can block us and alos if we are bulk using it they can charge us
//     auth:{
//         user:'manindra301998',
//         pass:'ppmpjwgdoullwfrd'
//     }
// }

// );

///below 2 lines are used instead of above commented lines bcoz of development environment
const env=require('./environment')

//this transporter is the part which is responsible to sent the email so this is the part which defines how the communication is going to take place
let transporter=nodemailer.createTransport(env.smtp);


//render Template defines whenever i m going to send an html email where the file is placed inside the views and inside the mailer folder
let renderTemplate=(data,relativePath/*from where the mail is being sent*/)=>{
    let mailHTML; //storing  what all the html which is going to be sent in the mail


    ejs.renderFile(//we are using ejs to render the template and send it just like while sending email we will filling those variables
    path.join(__dirname,/*we have place the email template in the views*/'../views/mailer',relativePath/*here relative path is the place from where this function is called*/),
    //here data is the context that we pass to ejs like name which is to be  filled inside the template
    data,
    function(err,template){//this is a call back function and the template is basically composed of data and path.join

        if(err){
            console.log('Error in rendering the template',err);
            return;
        }
        mailHTML=template;
        return;

    }

    )

    return mailHTML;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}
