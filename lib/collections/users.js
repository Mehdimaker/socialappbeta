Meteor.users.allow({  
	 update: function () { return true;}
});

Meteor.methods({ 
	
	setUsername: function (userId, newUsername) {
		//Accounts.setUsername(userId,newUsername);
		Meteor.users.update(userId, {$set: {username : newUsername}});
	},

	setAvatarUrl: function (userId, avatarUrl) {
  	Meteor.users.update(userId, {$set: avatarUrl});
	}	
});


