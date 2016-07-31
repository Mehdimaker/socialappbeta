

Template.postItem.helpers({  
	upmemberClass: function() {    
   var userId = Meteor.userId();   
   if (userId && _.include(this.members, userId)) {      
    return true;    
  }
  else {      
   return false;    
  }  
},
  myPost: function() {    
    var userId = Meteor.userId();    
    if (userId == this.authorId) {      
      return true;    
    }
    else {      
      return false;    
    }  
  },
  finish: function(){
    var today = new Date();
    return this.startPost <= today ? true : false;
  }
});

Template.postItem.onRendered(function () {
  $('.ui.dropdown.postSetting')
  .dropdown()
  ; 

});


Template.postItem.events({  
  'click .upmember': function() {	
    var userId = Meteor.userId();   
    if(!userId){
       //initialize the couple of modal
      $('.coupled.modal').modal({allowMultiple: false});
      $('.modal.signup').modal('attach events', '.modal.signin .menusignup');
      $('.modal.signin').modal('attach events', '.modal.signup .menusignin');
      $('.modal.forgotpass').modal('attach events', '.modal.signin .menuforgotpass');
   
      $('.modal.signin').modal('show');

      alert("vous devez vous connecter pour rejoindre cette entrainement");
    }else{ 
      Meteor.call('upmember', this._id);  
    }
  },
  'click .postDelete': function() {   
    Meteor.call('postDelete', this._id);  
  }
});