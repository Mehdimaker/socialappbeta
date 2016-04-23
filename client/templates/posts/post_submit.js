GoogleMaps.load({ v: '3', key: 'AIzaSyAmA6ZKbp6ScWvbsX_PYPKKR3SxzEiWcOU', libraries: 'geometry,places' });
var initAutoComplete = function() {
  //http://stackoverflow.com/questions/26949103/meteor-google-maps-autocomplete-only-works-once-on-multiple-templates
  var autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')),{types: ['geocode'] }
  );
};

Template.postSubmit.events({
   'click #autocomplete': function(e,template) {
     initAutoComplete();
   }
});

Template.postSubmit.onRendered(function () {
  $('#startdate').calendar({
  type: 'date'
  });
    $('#starthour').calendar({
    type: 'time'
  });
  $('.dropdown')
    .dropdown({})
  ;

  $('.ui.form.postSubmit').form({
    inline:true,
    onSuccess : function(e){
      e.preventDefault();
      address = $(e.target).find('[name=address]').val();
      var post = {            
          title: $(e.target).find('[name=title]').val(),            
          description: $(e.target).find('[name=description]').val(),
          startdate: $(e.target).find('[name=startdate]').val(),            
          starthour: $(e.target).find('[name=starthour]').val(),            
          address: $(e.target).find('[name=address]').val(),            
          type: $(e.target).find('[name=type]').val(),            
      
        };


      //var clientResult = Meteor.apply('convertAddress', address, {returnStubValue: true});

        
      Meteor.call('convertAddress', address, function (error,result) {
        if(result){
          alert(result);
        }
      }
      );
     
       /*

        Meteor.call('postInsert', post, function(error, result) {            
          // affiche l'erreur à l'utilisateur et s'interrompt            
          //if (error)                
          //  return throwError(error.reason);
          // if (result.postExists)                
          //   throwError('This link has already been posted');
          // Router.go('postPage', {_id: result._id});        
        });    
*/

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
      date: {
        identifier: 'date',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a date'
          }
        ]
      } , 
       hour: {
        identifier: 'hour',
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
      } , 
       type: {
        identifier: 'type',
        rules: [
          {
            type   : 'empty',
            prompt : 'Please enter a type'
          }
        ]
      } 
    }
  });
});