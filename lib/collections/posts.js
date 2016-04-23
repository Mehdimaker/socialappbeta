Posts = new Mongo.Collection('posts');

// nous éditons et supprimons des posts depuis le client, donc ajout de allow et deny.
/*Posts.allow({  
  update: function(userId, post) { return ownsDocument(userId, post); },  
  remove: function(userId, post) { return ownsDocument(userId, post); },
});
*/
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
    // meteor add check  -> verification des champ string et que le l'utilisateur soit bien connecté
    check(Meteor.userId(), String);        
    check(postAttributes, {            
      title: String,            
      description: String,
      startdate: String,            
      starthour: String,
      address: String,            
      type: String
    });     
   
    //vérifie si le lien est déja résent dans nos poste
    var postWithSameLink = Posts.findOne({title: postAttributes.title});        
        if (postWithSameLink) {            
          return {                
            postExists: true,                
            _id: postWithSameLink._id            
          }        
      }
    var user = Meteor.user();  
    //_.extend() fait partie de la librairie Underscore, et qu'elle vous permet simplement d’“étendre” un objet avec les propriétés d'un autre.       
    var post = _.extend(postAttributes, {            
      authorId: user._id,                     
      submitted: new Date(),
      commentsCount: 0,
      members: [user._id],
      membersCount: 1  
    });        
    
    var postId = Posts.insert(post);    
    if (postId)
      console.log("Post insséré !");
    //return {            
    //  _id: postId        
    //};    
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
    },
    convertAddress: function(address) {  
      check(address, String);
      var latlng=[];
      console.log(latlng);
      Meteor.http.call("GET", 'http://nominatim.openstreetmap.org/search?format=json&q='+address,
      function(error, result) {
        if (!error) {
          latlng = [parseFloat(result.data[0].lat),parseFloat(result.data[0].lon)];
          console.log(latlng);
        } 
        else {
          console.log("error");
        }
      });
                console.log(latlng);

      return latlng;


  /*
    $.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q='+address,function(data){
      latlng = [parseFloat(data[0].lat),parseFloat(data[0].lon)];
      console.log("serveur"+latlng);
      return latlng;
      });
  */
  }
  });