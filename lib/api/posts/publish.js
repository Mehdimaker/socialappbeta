
if (Meteor.isServer) {
	
	Meteor.publish('allPosts', function () {
	  return Posts.find();
	});

	Meteor.publish('userPosts', function () {
	  return Posts.find({ members: { $in: [this.userId] } });
	});

	Meteor.publish('singlePost', function(id) {  
	  return Posts.find(id);
	});

}