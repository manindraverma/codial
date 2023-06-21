const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');

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
    },
    avatar: {
        type:String
    }
},
    {
    timestamp:true
});
//after installing multer to describe the path where the file need to be stored which is being uploaded
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
     
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

  //static function- a function which can be call over all the class
  userSchema.statics.uploadedAvatar=multer({storage:  storage}).single('avatar');
  //the avatar_Path should be available  publically for  user model
  userSchema.statics.avatarPath= AVATAR_PATH;


//tell mongoose that it is a model
const user= mongoose.model('User',userSchema);
module.exports=user;