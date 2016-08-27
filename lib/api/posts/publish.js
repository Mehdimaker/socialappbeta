
if (Meteor.isServer) {
	
	Meteor.publish('allPosts', function () {
	  return Posts.find();
	});

	Meteor.publish('startPosts', function () {
		var start = new Date();
		return Posts.find({startPost: {$gte: start}});
	});

	Meteor.publish('userPosts', function () {
	  return Posts.find({ members: { $in: [this.userId] } });
	});

	Meteor.publish('singlePost', function(id) {  
	  return Posts.find(id);
	});

}