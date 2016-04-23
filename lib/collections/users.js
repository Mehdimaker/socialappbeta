Meteor.users.allow({  
	 update: function () { return true;}
});

Meteor.methods({ 
	setUsername: function (userId, newUsername) {
		Accounts.setUsername(userId,newUsername);
	}	,
	setAvatarUrl: function (userId, avatarUrl) {
  	Meteor.users.update(userId, {$set: avatarUrl});
	}	
});


