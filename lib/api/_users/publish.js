if (Meteor.isServer) {
    
  Meteor.publish('allUsers', function() {  
  	return Meteor.users.find();
  });

  Meteor.publish("userData", function () {
    if (this.userId) {
      return Meteor.users.find({_id: this.userId},
       {fields: { 
        'description': 1,
        'avatarMini':1,
        'avatarMega':1,
        'bio':1,
        'gender':1,
        'location':1,
        'language':1
      }});
    } else {
      this.ready();
    }
  });

}