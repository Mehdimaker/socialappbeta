GoogleMaps.load({ v: '3', key: Meteor.settings.public.googleapp, libraries: 'geometry,places' });
var initAutoComplete = function() {
  //http://stackoverflow.com/questions/26949103/meteor-google-maps-autocomplete-only-works-once-on-multiple-templates
  var autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')),{types: ['geocode'] }
    );
};

Template.postSubmit.helpers({
  calculateChar: function() {
    return Session.get('calculateChar');
  }
});

Template.postSubmit.events({
 'click #autocomplete': function(e,template) {
   initAutoComplete();
   }/*
   ,'change #autocomplete ': function(e,template) {
    var address = $(".pac-container .pac-item:active").text();

      console.log(address);
    }*/,
    'keyup textarea': function (event, template) {
      Session.set("calculateChar", event.currentTarget.value.length);
    }
  });

Template.postSubmit.onRendered(function () {

  $('#startdate').calendar({
    type: 'date',
    minDate: new Date()
  });

  $('#starthour').calendar({
    type: 'time'
  });

  $('.dropdown')
    .dropdown({})
  ;

  $('.ui.form.postSubmit').form({
    onSuccess : function(e){
      e.preventDefault();
      var address = $(e.target).find('[name=address]').val();
      var addressArray=  address.split(/[,,]/);
      var date = $(e.target).find('[name=startdate]').val();
      var hour = $(e.target).find('[name=starthour]').val();

      var post = {            
        title: $(e.target).find('[name=title]').val(),            
        description: /*$(e.target).find('[name=description]').val()*/"no description",
        startPost: new Date(date+" "+hour), 
        address: address,
        city: addressArray[1].replace(' ',''),            
        type: /*$(e.target).find('[name=type]').val()*/"no type",            
      };
      Meteor.call('postInsert', post, function(error, result) {  
        if (result)
          Router.go('postPage', {_id: result._id});        

      });   

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
      } ,   
      /*description: {
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
      }, */
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
});