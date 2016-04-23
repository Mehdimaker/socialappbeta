Template.postItem.helpers({
	authorFindName: function(authorId){
		var user = Meteor.users.findOne({_id: authorId});
		return user.username; 
	},
	authorFindAvatar: function(authorId){
		var user = Meteor.users.findOne({_id: authorId});
		return user.avatarMini; 
	},  
	upmemberClass: function() {    
  	var userId = Meteor.userId();    
  	if (userId && !_.include(this.members, userId)) {      
  		return true;    
  	}
  	else {      
  	 	return false;    
  	}  
  }

});


Template.postItem.events({  
  'click .upmember': function(e) {		
  	e.preventDefault();    
		Meteor.call('upmember', this._id);  
	}
});