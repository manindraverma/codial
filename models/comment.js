const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
           //ref: this shows we refer to which schema here we refer to user schema
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
           //ref: this shows we refer to which schema here we refer to Post schema
           ref:'Post'
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Like"
        }
    ]
},{
        timestamps:true
    }
)

//need to tell that this is a model in the database
const Comment=mongoose.model('Comment',commentSchema);

//export this module
module.exports=Comment;