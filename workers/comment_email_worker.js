//here we are creating a worker 
//for each job we need to create a separate worker
const Queue=require('../config/kue');

const commentsMailer=require('../mailer/comments_mailer');
//every work has a process function that tells worker whenever a new task is added in ur queue u need to run the code inside this process function   
Queue.process('emails',function(job,done){

    //in the above line the first parameter as argument is type of Queue that is name of Queue
    //so the function is going to be executed inside of this i.e the mailer which is going to be called which is going to be put here and than the data that is the comment here

    console.log('email worker is processing a job:',job.data);
    //in above job.data holds the comment that is being sent


    commentsMailer.newComment(job.data);

    done();
})


//after all this worker is going to be called from the controller
