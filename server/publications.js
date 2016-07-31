//USERS
Meteor.publish('allUsers', function() {  
	return Meteor.users.find();
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
     {fields: { 
      'description': 1,
      'avatarMini':1,
      'avatarMega':1,
      'bio':1,
      'gender':1,
      'location':1,
      'language':1
    }});
  } else {
    this.ready();
  }
});

//AVATARS
Meteor.publish('allAvatars', function () {
  return Avatars.find();
});

Meteor.publish('userAvatar', function () {
  return Avatars.find({owner: this.userId});
});


//POSTS
Meteor.publish('allPosts', function () {
  return Posts.find();
});

Meteor.publish('userPosts', function () {
  return Posts.find({ members: { $in: [this.userId] } });
});

Meteor.publish('singlePost', function(id) {  
  return Posts.find(id);
});


//COMMENTS
Meteor.publish('comments', function(postId) {  
  check(postId, String);  
  return Comments.find({postId: postId});
});