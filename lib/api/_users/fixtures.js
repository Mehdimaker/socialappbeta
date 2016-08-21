if (Meteor.isServer) {

  if ( Meteor.users.find().count() === 0 ) {
   console.log('Creating users: ');

   var users = [
   {name:"MehdiMaker",email:"contact@mehdimaker.com",password:"aaaaaa",roles:["admin"]},
   {name:"testUser",email:"test@test.com",password:"aaaaaa",roles:[]}
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


}