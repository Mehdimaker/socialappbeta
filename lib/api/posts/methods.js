Meteor.methods({    
/*==================================
=            POSTINSERT            =
==================================*/
  postInsert: function(postAttributes) {   
    /* VERIFICATION USER */
    if(!Meteor.user()){ 
      throw new Meteor.Error("not-authorized");
    }  
    /* CHECK ARGUMENTS */
    check(Meteor.userId(), String);        
    check(postAttributes, {            
      title: String,            
      description: String,
      startPost: Date,            
      address: String, 
      city: String,           
      hashtags: Array,
    }); 
    /* ACTION */     
    try{
      var result = Meteor.http.get('http://nominatim.openstreetmap.org/search?format=json&q='+postAttributes.address);
      var latlng = [parseFloat(result.data[0].lat),parseFloat(result.data[0].lon)]; 
    }
    catch(e){
      console.log("latlng non trouvé");
        //throw new Meteor.Error("latlng","latlng non trouvé");
        //return null;
    }
    //vérifie si le lien est déja résent dans nos poste
    /*
    var postWithSameLink = Posts.findOne({title: postAttributes.title});        
    if (postWithSameLink) {  
      console.log("le titre de votre poste existe déjà !");          
      return false;
      //return {                
      //  postExists: true,                
      //  _id: postWithSameLink._id            
      //}        
    }
  */
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



/*================================
=            POSTEDIT            =
================================*/
  postEdit: function(postId, postAtributes){
    /* VERIFICATION USER */
    var post = Posts.findOne(postId);
    if(!Roles.userIsInRole(this.userId, ['admin']) ){
      if(Meteor.userId() !== post.authorId){ 
        throw new Meteor.Error("not-authorized");
      }
    }  
    /* CHECK ARGUMENTS */
    check(postId, String);  
    check(postAtributes, {            
      title: String,            
      description: String,
      startPost: Date,            
      address: String, 
      city: String,           
      hashtags: Array,
    });      
    /* ACTION */
    const update = Posts.update(postId, { $set: postAtributes,});
    /* RETURN */
    if (update){
      console.log("Post modifié !");
      return { _id: postId };  
    } 
  },

/*==================================
=            POSTDELETE            =
==================================*/
  postDelete: function(postId){
    /* VERIFICATION USER */
    if(!Roles.userIsInRole(this.userId, ['admin']) ){
      if(Meteor.userId() !== post.authorId){ 
        throw new Meteor.Error("not-authorized");
      }
    }  
    /* CHECK ARGUMENTS */
    check(postId, String);
    /* ACTION */
      Posts.remove(postId);
    /* RETURN */
      console.log(`Post removed : ${post.title}`);
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



    downmember: function(postId) {  

    check(this.userId, String);    
    check(postId, String);
    var affected = Posts.update({    
      _id: postId,    
    }, {    
      $pull: {members: this.userId},    
      $inc: {membersCount: -1}  
    });  
    if (! affected)    
     console.log("Vous n'avez pas pu vous retirer de ce post.");  
  }


});

