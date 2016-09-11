Template.imgEdit.events({
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