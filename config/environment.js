//we need fs library to write the logs file
const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');


//file path where log is going to be saved
const logDirectory=path.join(__dirname,'../production_logs');
//check whether the log directory exists or not if not than create it using below command
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

//whenever user access ,than logs should be stored
 
const accessLogStream=rfs.createStream("access.log",{
    interval:'1d',
    path:logDirectory
});

const development={
    name:'development',
    assest_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'coedial_development',
    smtp:{
        service:'gmail',
        host:'smtp.google.com',
        port:587,
        secure:false,
        //the authentication-that is to establish  the identity with which we  will be sending that email bcoz if we dont establish the identity anyone can use gmail to send the email from anyone to anyone so we need to establish the identity so that gmail tracks our activity and if we are misusing the mails than gmail can block us and alos if we are bulk using it they can charge us
        auth:{
            user:'manindra301998',
            pass:'ppmpjwgdoullwfrd'
        }
    },
    google_client_ID: '370216043982-8mctp6s59k53ao8ud8nqp6pv8n0kuujf.apps.googleusercontent.com',
    google_client_Secret: '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',
    google_call_back_URL: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret:'codeial',
    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    }
}

const production={
    name:'production',
    assest_path:process.env.COEDIAL_ASSET_PATH,
    session_cookie_key:process.env.COEDIAL_session_cookie_key,
    db:process.env.COEDIAL_DB,
    smtp:{
        service:'gmail',
        host:'smtp.google.com',
        port:587,
        secure:false,
        //the authentication-that is to establish  the identity with which we  will be sending that email bcoz if we dont establish the identity anyone can use gmail to send the email from anyone to anyone so we need to establish the identity so that gmail tracks our activity and if we are misusing the mails than gmail can block us and alos if we are bulk using it they can charge us
        auth:{
            user:process.env.COEDIAL_gmail_user,
            pass:process.env.COEDIAL_gmail_password
        }
    },
    google_client_ID: process.env.COEDIAL_google_client_ID,
    google_client_Secret: process.env.COEDIAL_google_client_secret,
    google_call_back_URL: process.env.COEDIAL_google_call_back_URL,
    jwt_secret:process.env.COEDIAL_jwt_secret,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    }
}

module.exports=
//development;
eval(process.env.COEDIAL_ENVIRONMENT) == undefined?development:eval(process.env.COEDIAL_ENVIRONMENT);