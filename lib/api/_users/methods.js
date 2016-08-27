Meteor.methods({ 
	
	setUsername: function (userId, newUsername) {
		//Accounts.setUsername(userId,newUsername);
		Meteor.users.update(userId, {$set: {username : newUsername}});
	},

	setAvatarUrl: function (userId, avatarUrl) {
  	Meteor.users.update(userId, {$set: avatarUrl});
	}	,
/*==================================
=            USERDELETE            =
==================================*/
  userDelete: function(userId){
    /* VERIFICATION USER */
    if(!Roles.userIsInRole(this.userId, ['admin']) ){
       throw new Meteor.Error("not-authorized");
    }  
    /* CHECK ARGUMENTS */
    check(userId, String);
    /* ACTION */
     Meteor.users.remove(userId);
    /* RETURN */
     console.log(`User removed !`);
  },
});

