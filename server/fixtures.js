/////////////////////////////////////////////////
////////////////  USERS FIXTURES   /////////////////
/////////////////////////////////////////////////

if ( Meteor.users.find().count() === 0 ) {
 console.log('Creating users: ');

 var users = [
 {name:"Admin",email:"admin@admin.com",password:"aaaaaa",roles:["admin"]},
 {name:"MehdiMaker",email:"mehdi@mehdi.com",password:"aaaaaa",roles:[]}
 ];

 _.each(users, function (userData) {
  var id,
  user;

  console.log(userData);

  id = Accounts.createUser({
    email: userData.email,
    password: userData.password,
    username: userData.name 
  });

      // email verification
      //Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

      updateUser= {
        avatarMini : "/user_icon_30.png",
        avatarMega : "/user_icon_300.png",
        bio : "",
        gender: "no gender",
        location: "nc",
        language: "no language"
      }

      Meteor.users.update({_id:id}, { $set: updateUser });

      Roles.addUsersToRoles(id, userData.roles);

    });
 console.log("Users fixtures insterted !");

};


/////////////////////////////////////////////////
////////////////  POSTS FIXTURES  /////////////////
/////////////////////////////////////////////////

FixInsertposts = function() {

  const admin = Accounts.findUserByEmail('admin@admin.com');
  const mehdi = Accounts.findUserByEmail('mehdi@mehdi.com');
  var date = new Date();

  var postsFixtures = [
  {
    title: "Entrainement de foot !",
    description: "no description",
    startPost: new Date(date.setHours(2,0,0,0)),
    address: "Drancy, France",
    city: "Drancy",
    type: "no type",
    authorId: mehdi._id,
    submitted: new Date(),
    commentsCount: 0,
    members: [mehdi._id],
    membersCount: 1,
    latlng: [48.9229821,2.4455201]
  },  
  {
    title: "Workout de Spartiate !",
    description: "no description",
    startPost: new Date(date.setHours(26,0,0,0)),
    address: "55 Rue de Vincennes, Montreuil, France",
    city: "Montreuil",
    type: "no type",
    authorId: mehdi._id,
    submitted:  new Date(),
    commentsCount: 0,
    members: [mehdi._id],
    membersCount: 1,
    latlng: [48.85439235,2.43625887241379]
  },  
  {
    title: "Street Boxing La Vilette",
    description: "no description",
    startPost: new Date(date.setHours(70,0,0,0)),
    address: "10 Rue de Paris, Vaudherland, France" ,
    city: "Vaudherland",
    type: "no type",
    authorId: admin._id,
    submitted: new Date(),
    commentsCount: 0,
    members: [admin._id],
    membersCount: 1,
    latlng: [49.0002755,2.4863249]
  }
  ];

  _.each(postsFixtures, function (post) {

    var push;
    push = Posts.insert({
      title: post.title,
      description: post.description,
      startPost: post.startPost,
      address: post.address,
      city: post.city,
      type: post.type,
      authorId: post.authorId,
      submitted: post.submitted,
      commentsCount: post.commentsCount,
      members: post.members,
      membersCount: post.membersCount,
      latlng: post.latlng
    });

  });
}

if(Posts.find().count() <= 1){
  FixInsertposts();
  console.log("Posts fixtures insterted !");
}
