Template.testphotos.helpers({
  photos: function(){
      return Avatars.find().fetch();
  }
});