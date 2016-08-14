import '/imports/config/config-google.js';

let activeAutocomplete = false;
/*==================================
=            ONRENDERED            =
==================================*/
Template.postSubmit.onRendered(function () {
  $('.ui.form.postSubmit').form({
    onSuccess : function(e){
      e.preventDefault();
    // ADD LOADING
    $(".ui.button.submit").addClass("loading");
    // VARIABLES
    var address = $(e.target).find('[name=address]').val();
    var addressArray=  address.split(/[,,]/);
    var date = $(e.target).find('[name=startdate]').val();
    var hour = $(e.target).find('[name=starthour]').val();
    const city = (addressArray.length >= 2) ? addressArray[1].replace(' ','') : address;
    var post = {            
      title: $(e.target).find('[name=title]').val(),            
      description: "no description",
      startPost: new Date(date+" "+hour), 
      address: address,
      city: city,            
      type: "no type",            
    };
    // METHOD
    Meteor.call('postInsert', post, function(error, result) {  
      if (result){
        Router.go('postPage', {_id: result._id});        
      }else{

      }
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
        type   : 'minLength[6]',
        prompt : 'Your title must be at least {ruleValue} characters'
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
    }, 
    address: {
      identifier: 'address',
      rules: [
      {
        type   : 'empty',
        prompt : 'Please enter a address'
      }
      ]
    }
  }
});
  $('#startdate').calendar({
    type: 'date',
    minDate: new Date(),
  });
  $('#starthour').calendar({
    type: 'time'
  });
  //$('.dropdown').dropdown({});
});

/*===============================
=            HELPERS            =
===============================*/
Template.postSubmit.helpers({
  calculateChar: function() {
    return Session.get('calculateChar');
  }
});

/*==============================
=            EVENTS            =
==============================*/
Template.postSubmit.events({
 'click #autocomplete': function(e,template) {
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
}
});

