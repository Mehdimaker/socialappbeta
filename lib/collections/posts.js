Posts = new Mongo.Collection('posts');

Posts.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});


Meteor.methods({    
  
  postInsert: function(postAttributes) {   

    try{
      var result = Meteor.http.get('http://nominatim.openstreetmap.org/search?format=json&q='+postAttributes.address);
      var latlng = [parseFloat(result.data[0].lat),parseFloat(result.data[0].lon)]; 

    }
    catch(e){
        //throw new Meteor.Error("latlng","latlng non trouvé");
        //return null;
    }
    check(Meteor.userId(), String);        
    check(postAttributes, {            
      title: String,            
      description: String,
      startPost: Date,            
      address: String, 
      city: String,           
      type: String,
    });     
    //vérifie si le lien est déja résent dans nos poste
    var postWithSameLink = Posts.findOne({title: postAttributes.title});        
    if (postWithSameLink) {  
      console.log("le titre de votre poste existe déjà !");          
      return false;
      //return {                
      //  postExists: true,                
      //  _id: postWithSameLink._id            
      //}        
    }

    var user = Meteor.user();  
    //_.extend() fait partie de la librairie Underscore, et qu'elle vous permet simplement d’“étendre” un objet avec les propriétés d'un autre.       
    var post = _.extend(postAttributes, {            
      authorId: user._id,                     
      submitted: new Date(),
      commentsCount: 0,
      members: [user._id],
      membersCount: 1,
      latlng: latlng
    });        
    
    var postId = Posts.insert(post);    
    if (postId)
      console.log("Post insséré !");
    return {            
      _id: postId        
    };     
  },    




  postEdit: function(postId, postAtributes){

    var post = Posts.findOne(postId);
    if(Meteor.userId() == post.authorId){
      check(postId, String);  
      check(postAtributes, {            
        title: String,            
        description: String,
        startPost: Date,            
        address: String, 
        city: String,           
        type: String,
      });      
      const update= Posts.update(postId, { $set: postAtributes,});
      if (update){
        console.log("Post modifié !");
        return {            
         _id: postId        
       };    
     } 
   }else{
    throw new Meteor.Error("not-authorized");
  }
},




postDelete: function(postId){

  check(postId, String);
  var post = Posts.findOne(postId);
  if(Meteor.userId() == post.authorId){
    Posts.remove(postId);
    console.log(`Post removed : ${post.title}`);
  }else{
    throw new Meteor.Error("not-authorized");
  }
},




upmember: function(postId) {  

  check(this.userId, String);    
  check(postId, String);
  var affected = Posts.update({    
    _id: postId,    
    members: {$ne: this.userId}  
  }, {    
    $addToSet: {members: this.userId},    
    $inc: {membersCount: 1}  
  });  
  if (! affected)    
   console.log("Vous n'avez pas pu voter pour ce post.");  
}


});



