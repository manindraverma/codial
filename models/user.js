const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},
    {
    timestamp:true
});

//tell mongoose that it is a model
const user= mongoose.model('User',userSchema);
module.exports=user;