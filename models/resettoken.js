const mongoose=require('mongoose');

const resetPasswordTokenSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    isValid:{
        type:Boolean,
        required:true
    },
    accessToken:{
        type:String,
        required:true,
        unique:true

    }
},{
    timestamps:true
});

//need to tell that this is a model in the database
const resetPasswordToken = mongoose.model('ResetPasswordToken', resetPasswordTokenSchema);

//export this module
module.exports = resetPasswordToken;