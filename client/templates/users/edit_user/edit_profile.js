Template.editProfile.onRendered(function () {

  $('.ui.form.editusername').form({
      inline:true,
      onSuccess : function(){
        var userId = Meteor.userId();
        var newUsername = $('#editprofile-username').val()
        Meteor.call('setUsername', userId, newUsername);
  $('.ui.modal.tiny.editusername')
   .modal('hide');
      },
      fields: {
       username: {
          identifier: 'username',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a username'
            },
            {
              type   : 'minLength[5]',
              prompt : 'Your username must be at least {ruleValue} characters'
            }
            ,
            {
              type   : 'maxLength[16]',
              prompt : 'Your username must be at max {ruleValue} characters'
            },
            {
              type:'regExp[/^[a-z0-9_-]{5,16}$/gi]',
              prompt: 'Your username is not correct, please dont use special characters and no space.'
            }
          ]
        } 
      }
    });


  $('.ui.form.editlocation').form({
      inline:true,
      onSuccess : function(){
        var userId = Meteor.userId();
        var newLocation = $('#editprofile-location').val();
        Meteor.users.update({_id:userId}, { $set: {location: newLocation} });
    $('.ui.modal.tiny.editlocation')
   .modal('hide');
      },
      fields: {
      location: {
          identifier: 'bio',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a location'
            },
            {
              type   : 'minLength[4]',
              prompt : 'Your location must be at least {ruleValue} characters'
            }
          ]
        }
      }
    });



  $('.ui.form.editbio').form({
      inline:true,
      onSuccess : function(){
        var userId = Meteor.userId();
        var newBio = $('#editprofile-bio').val();
        Meteor.users.update({_id:userId}, { $set: {bio: newBio} });
    $('.ui.modal.tiny.editbio')
   .modal('hide');
      },
      fields: {
      bio: {
          identifier: 'bio',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter a bio'
            },
            {
              type   : 'minLength[6]',
              prompt : 'Your bio must be at least {ruleValue} characters'
            }
          ]
        }
      }
    });


 });
Template.editProfile.events({
  
  'click .modalusername': function() {
    $('.ui.modal.tiny.editusername')
    .modal('show');
  },  

  'click .modalbio': function() {
    $('.ui.modal.tiny.editbio')
    .modal('show');
  },

  'click .modallocation': function() {
    $('.ui.modal.tiny.editlocation')
    .modal('show');
  },

  'click #testt': function(event,template) {
    $('.myFileInput').click();
  },

  'change .myFileInput': function(event,template) {
      FS.Utility.eachFile(event, function(file) {
        var userId = Meteor.userId();
        var newFile = new FS.File(file);
        newFile.owner = userId;

        if(Avatars.findOne({owner: userId})){
          var oldAvatarId =  Avatars.findOne({owner: userId})._id;
        }        

        Avatars.insert(newFile, function (err, fileObj) {
          if (err){ console.log("error upload");} 
          else { console.log("Avatar inserted !");

            var avatarUrl = {
                "avatarMini": "/cfs/files/avatars/" + fileObj._id+  '/' + fileObj.name() + '?store=avatarMini', 
                "avatarMega": "/cfs/files/avatars/" + fileObj._id+  '/' + fileObj.name() + '?store=avatarMega' 
            };
                          
            Deps.autorun(function (computation) {
              var myfile = Avatars.findOne(fileObj._id);
              if (myfile.hasStored('avatarMini') && myfile.hasStored('avatarMega')) {
                Meteor.call('setAvatarUrl', userId, avatarUrl); 
                if(oldAvatarId){
                  Avatars.remove(oldAvatarId,function(){
                    console.log('Avatar(s) removed !');
                  });
                }  
                computation.stop();
              }
            });
          }          
        });
    });
  }
});


