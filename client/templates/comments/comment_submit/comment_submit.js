Template.commentSubmit.onRendered(function () {
postId= this.data._id;
  $('.ui.form.commentSubmit').form({
    onSuccess : function(e){
    e.preventDefault();
    var $body = $(e.target).find('[name=body]');
    var comment = {
      body: $body.val(),
      postId: postId
    };

    Meteor.call('commentInsert', comment, function(error, commentId) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  },
    fields: {
      body: {
        identifier: 'body',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a comment'
          },
          {
            type   : 'minLength[6]',
            prompt : 'Your comment must be at least {ruleValue} characters'
          }
        ]
      }
    }
});

});
