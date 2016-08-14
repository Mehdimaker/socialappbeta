Template.labelUser.helpers({
	member: function() {    
		// OPTIMISER console log executer 4 fois pour quoi ?
		//console.log(this.id);
    return Meteor.users.findOne(this.id);  
  }
});

Template.labelUser.events({
  'click .profileMember': function(event) { 
    const memberId = $(event.target).data("memberid");
    $(`.modal.modalUser.${memberId}`).modal('show');
  }
});


