//to establish relationship in database of 1 is too many type like this where one user can post many post 
const User = require('../models/user');
const mongoose = require('mongoose');
//creating a schema to build a collection that goes into database
const postSchema = new mongoose.Schema({
    //this schema has below fields
    content: {
        type: String,
        //without this field the data wouldn't be saved
        require: true
    },
    user: {
        //this post which is created , is going to link to a particular user who posted this post  so it is going to refer to the userSchema
        //here type is a reference
        type: mongoose.Schema.Types.ObjectId,
        //ref: this shows we refer to which schema here we refer to user schema
        ref: 'User'
    },
    //includes the array of ids of all comments in this post Schema itself
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        //ref: this shows we refer to which schema here we refer to user schema
        ref: 'Comment'
    }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like"
        }
    ]




}, {
    timestamps: true
});

//need to tell that this is a model in the database
const Post = mongoose.model('Post', postSchema);

//export this module
module.exports = Post;