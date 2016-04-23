

Template.editProfile.onRendered(function () {
    $('.ui.form.editprofile').form({
      inline:true,
      onSuccess : function(){
        var userId = Meteor.userId();
        var newUsername = $('#editprofile-username').val();
        var newDescription = $('#editprofile-description').val();
        Meteor.users.update({_id:userId}, { $set: {description: newDescription} });

        Meteor.call('setUsername', userId, newUsername);


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
              type   : 'minLength[6]',
              prompt : 'Your username must be at least {ruleValue} characters'
            }
          ]
        } ,   description: {
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
        }
      }
    });


});

Template.editProfile.events({
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




