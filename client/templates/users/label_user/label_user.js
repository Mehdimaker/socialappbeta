Template.labelUser.helpers({
	member: function() {    
		console.log(this.id);
    return Meteor.users.findOne(this.id);  
  }
});

Template.labelUser.events({
  'click .profileMember': function(event) { 
    const memberId = $(event.target).data("memberid");
    console.log(`.modal.modalUser.${memberId}`);
    $(`.modal.modalUser.${memberId}`).modal('show');
  }
});


