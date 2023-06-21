//this js file fetches data from the form and  than convert  it into json format  and send it  to the action
//so whenever we submit the form it  should not submit  automatically ,it should  submit via  jquery ajax
{
    //function  which handles submission of this post or sending data to the action
    //method to submit the form data for the new post using AJAX
    let createPost = function () {
        let newPostForm = $("#new-post-form");

        newPostForm.submit(function (e) {
            //prevent the form from submitting automatically
            e.preventDefault();
//we want the form to be submitted manually  using ajax
            $.ajax({
                type: 'Post',
                url: '/posts/create',
                //send  in the  data  for that we are creating the post for
                //serialize the data that we will receive and this will convert the form data into json like content would be the key and value is the data filled in the form
                data: newPostForm.serialize(),
                //in success there is a function where we will receive the data ,here data will be in json format
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    //newPost object inside it has a class delete-post-button so button has been given to the delete post function
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    new PostComments(data.data.post._id);


                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);

                }



            });
        });

        //once we submit the form we will recevie data in post_controller
    }
    //method to create a post in DOM

    //copying the html text and converting it to jquery Object
    let newPostDom = function (post) {
        return $(`<li id="post-${post._id}">
<p> 
    <!-- below verify  whether the user is signed in and the user who logged in is same the user who has made the post -->
   
        <small>
            <a class="delete-post-button" href="/posts/destroy/${ post._id }">DELETE</a>
        </small>
    
    
    
    ${post.content}
    <br>
   <small>${post.user.name}
   </small> 
</p>

<div class="post-comments">
    
        <form id="post-${ post._id }-comments-form" action="/comments/create" method="post">
            <input type="text" name="content" placeholder="type here to add comments" required>
            <!-- sent the id of the post to which comment need to be added -->
            <input type="hidden" name="post" value="${post._id}" >
            <input type="submit" value="add comments">
        </form>
       



<div class="post-comments-list">
    <ul id="post-comments-${post._id}">
        
    </ul>

</div>
</div>
</li> `);
    }


    //method to delete a post from Dom-this function sends the post id to be deleted and also this is the function which  will be sending the ajax request
    //deleteLink will contain the a tag of class delete-post-button passed from the _post.ejs file 
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    $(`#post-${data.data.post_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Post Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })

    }


 // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
 let convertPostsToAjax = function(){
    $('#posts-list-container>ul>li').each(function(){
        let self = $(this);
        let deleteButton = $(' .delete-post-button', self);
        deletePost(deleteButton);

        // get the post's id by splitting the id attribute
        let postId = self.prop('id').split("-")[1]
        new PostComments(postId);
    });
}



createPost();
convertPostsToAjax();
}