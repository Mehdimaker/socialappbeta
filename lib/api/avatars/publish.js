if (Meteor.isServer) {
	
	Meteor.publish('allAvatars', function () {
	  return Avatars.find();
	});

	Meteor.publish('userAvatar', function () {
	  return Avatars.find({owner: this.userId});
	});

}