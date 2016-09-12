
if (Meteor.isServer) {
/* IN DEVELOPPEMENT 

  FixInsertposts = function() {

    const admin = Accounts.findUserByEmail('contact@mehdimaker.com');
    const testUser = Accounts.findUserByEmail('test@test.com');
    var date = new Date();

    var postsFixtures = [
    {
      title: "Entrainement de foot !",
      description: "no description",
      startPost: new Date(date.setHours(2,0,0,0)),
      address: "Drancy, France",
      hashtags: [],
      type: "no type",
      authorId: testUser._id,
      submitted: new Date(),
      commentsCount: 0,
      members: [testUser._id],
      membersCount: 1,
      latlng: [48.9229821,2.4455201]
    },  
    {
      title: "Workout de Spartiate !",
      description: "no description",
      startPost: new Date(date.setHours(26,0,0,0)),
      address: "55 Rue de Vincennes, Montreuil, France",
      city: "Montreuil",
      hashtags: [],
      authorId: testUser._id,
      submitted:  new Date(),
      commentsCount: 0,
      members: [testUser._id],
      membersCount: 1,
      latlng: [48.85439235,2.43625887241379]
    },  
    {
      title: "Street Boxing La Vilette",
      description: "no description",
      startPost: new Date(date.setHours(70,0,0,0)),
      address: "10 Rue de Paris, Vaudherland, France" ,
      city: "Vaudherland",
      hashtags: [],
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
        hashtags: post.hashtags,
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
  */
}