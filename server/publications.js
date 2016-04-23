//USERS
Meteor.publish('allUsers', function() {  
	return Meteor.users.find();
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'description': 1,'avatarMini':1,'avatarMega':1}});
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