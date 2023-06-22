const mongoose=require('mongoose');

// mongoose.connect('mongodb://localhost/coedial_development');


//now we are using development environment so below 2 lines are mention
const env= require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`);
//mongoose.connect(`mongodb+srv://manindra301998:Manindra%40123@cluster0.xj75jd5.mongodb.net/?retryWrites=true&w=majority`);
const db=mongoose.connection;

db.on('error',console.error.bind(console,"error connecting to mongoDB"));

db.once('open',function(){
    console.log("connected to database:: MongoDB");
});

module.exports=db;