{let t=function(){let t=$("#new-post-form");t.submit((function(o){o.preventDefault(),$.ajax({type:"Post",url:"/posts/create",data:t.serialize(),success:function(t){let o=e(t.data.post);$("#posts-list-container>ul").prepend(o),n($(" .delete-post-button",o)),new PostComments(t.data.post._id),new Noty({theme:"relax",text:"Post published!",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},e=function(t){return $(`<li id="post-${t._id}">\n<p> \n    \x3c!-- below verify  whether the user is signed in and the user who logged in is same the user who has made the post --\x3e\n   \n        <small>\n            <a class="delete-post-button" href="/posts/destroy/${t._id}">DELETE</a>\n        </small>\n    \n    \n    \n    ${t.content}\n    <br>\n   <small>${t.user.name}\n   </small> \n</p>\n\n<div class="post-comments">\n    \n        <form id="post-${t._id}-comments-form" action="/comments/create" method="post">\n            <input type="text" name="content" placeholder="type here to add comments" required>\n            \x3c!-- sent the id of the post to which comment need to be added --\x3e\n            <input type="hidden" name="post" value="${t._id}" >\n            <input type="submit" value="add comments">\n        </form>\n       \n\n\n\n<div class="post-comments-list">\n    <ul id="post-comments-${t._id}">\n        \n    </ul>\n\n</div>\n</div>\n</li> `)},n=function(t){$(t).click((function(e){e.preventDefault(),$.ajax({type:"get",url:$(t).prop("href"),success:function(t){$(`#post-${t.data.post_id}`).remove(),new Noty({theme:"relax",text:"Post Deleted",type:"success",layout:"topRight",timeout:1500}).show()},error:function(t){console.log(t.responseText)}})}))},o=function(){$("#posts-list-container>ul>li").each((function(){let t=$(this),e=$(" .delete-post-button",t);n(e);let o=t.prop("id").split("-")[1];new PostComments(o)}))};t(),o()}