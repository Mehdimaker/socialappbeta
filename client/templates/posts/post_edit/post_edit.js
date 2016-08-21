import moment from "moment";
import '/imports/config/config-google.js';

let activeAutocomplete = false;
/*==================================
=            ONRENDERED            =
==================================*/
Template.postEdit.onRendered(function () {
  $('.ui.form.postEdit').form({
    onSuccess : function(e){
      e.preventDefault();
    // ADD LOADING
    $(".ui.button.submit").addClass("loading");
    // VARIABLES
    var address = $(e.target).find('[name=address]').val();
    var addressArray =  address.split(/[,,]/);
    var postId = $(e.target).find('[name=postId]').val();
    var date = $(e.target).find('[name=startdate]').val();
    var hour = $(e.target).find('[name=starthour]').val();
    const city = (addressArray.length >= 2) ? addressArray[1].replace(' ','') : address;
    var post = {            
      title: $(e.target).find('[name=title]').val(),            
      description: $(e.target).find('[name=description]').val(),
      startPost: new Date(date+" "+hour),            
      address: address,
      city: city,            
      hashtags: [],            
    };
    // METHOD
    Meteor.call('postEdit',postId, post, function(error, result) {  
      if (result)        
        sAlert.error('Login failed!');
        Router.go('postPage', {_id: result._id}); 

    });   
    // VALIDATIONS ERRORS
  },
  fields: {
    title: {
      identifier: 'title',
      rules: [
      {
        type   : 'empty',
        prompt : 'Please enter a title'
      },
      {
        type   : 'minLength[10]',
        prompt : 'Your title must be at least {ruleValue} characters'
      },
      {
        type   : 'maxLength[70]',
        prompt : 'Your title must be at max {ruleValue} characters'
      }
      ]
    } ,   
    description: {
      identifier: 'description',
      rules: [
      {
        type   : 'empty',
        prompt : 'Please enter a description'
      },
      {
        type   : 'minLength[6]',
        prompt : 'Your description must be at least {ruleValue} characters'
      }
      ]
    }, 
    startdate: {
      identifier: 'startdate',
      rules: [
      {
        type   : 'empty',
        prompt : 'Please enter a date'
      }
      ]
    } , 
    starthour: {
      identifier: 'starthour',
      rules: [
      {
        type   : 'empty',
        prompt : 'Please enter a hour'
      }
      ]
    } , 
    address: {
      identifier: 'address',
      rules: [
      {
        type   : 'empty',
        prompt : 'Please enter a address'
      }
      ]
      } /*, 
       type: {
        identifier: 'type',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a type'
          }
        ]
      } */
    }
  });
  $('#startdate').calendar({
    type: 'date',
    minDate: new Date()
  });
  $('#starthour').calendar({
    type: 'time'
  });
  $('.dropdown').dropdown({});
});

/*===============================
=            HELPERS            =
===============================*/
Template.postEdit.helpers({
  calculateChar: function() {
    return Session.get('calculateChar');
  },
  startdate: function() {
    console.log(moment(this.startPost).format("MMM D, gggg"));
    return moment(this.startPost).format("MMM DD, gggg");
  },
  starthour: function() {
    return moment(this.startPost).format("h:mm A");
  },
});

/*==============================
=            EVENTS            =
==============================*/
Template.postEdit.events({
 'click #autocomplete': function(e,template) {
  // TOTO A VEIRIFIER
  console.log("ffffff");
  if (!activeAutocomplete){
    const autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('autocomplete')),{types: ['geocode'] });  
    activeAutocomplete = true;
  }
},
'change #autocomplete ': function(e,template) {
  var address = $(".pac-container .pac-item:active").text();
  console.log(address);
},
'keyup textarea': function (event, template) {
  Session.set("calculateChar", event.currentTarget.value.length);
},
'click .modaldelete': function() {
   $('.ui.basic.modal.delete').modal({
     closable  : true,
     onDeny    : ()=>{
       return ;
     },
     onApprove : ()=> {
        Meteor.call('postDelete', this._id);  
        Router.go('/dashboard');
     }
   })
   .modal('show');
  },
});

