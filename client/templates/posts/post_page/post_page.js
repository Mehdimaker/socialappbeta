Template.postPage.rendered = function() {
  // Initialize Map
  var startPosition = this.data.latlng;
  var maps = [
  L.map("mappage1").setView(startPosition, 15),
  L.map("mappage2").setView(startPosition, 15),
  L.map("mappage3").setView(startPosition, 15)
  ]
  //var map = L.map("mappage1").setView(startPosition, 15);
  //var map = L.map("mappage2").setView(startPosition, 15);
  //var map = L.map("mappage3").setView(startPosition, 15);

  // definiton icon
  var greenIcon = L.icon({
      iconUrl: '/location-pin.png',
      shadowUrl: '/marker-shadow.png',
      iconSize:     [32, 32], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [16,32], // point of the icon which will correspond to marker's location
      shadowAnchor: [12,41],  // the same for the shadow
      //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });
  // AJOUT de titleLayer
  _.each(maps,  (map)=> {

    L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
           minZoom: 2,
           maxZoom: 18,
           attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    //AJOUT DES MARKERS
    var marker = L.marker(this.data.latlng,{icon: greenIcon}).addTo(map);
    //.bindPopup(this.data.address);
  });

};


Template.postPage.events({
'click .modalLeave': function() {
   $('.ui.basic.modal.leave').modal({
     closable  : true,
     onDeny    : ()=>{
       return ;
     },
     onApprove : ()=> {
      Meteor.call('downmember', this._id); 
      sAlert.warning(`You left training: ${this.title} !`);

        //Router.go('/dashboard');
     }
   })
   .modal('show');
  },
});


Template.postPage.helpers({
  comments: function() {    
    return Comments.find({postId: this._id});  
  },
  upmemberClass: function() {    
    var userId = Meteor.userId();   
    if (userId && _.include(this.members, userId)) {      
    return true;    
    }
    else {      
     return false;    
    }  
  },
  myPost: function() {    
    var userId = Meteor.userId();    
    if (userId == this.authorId) {      
      return true;    
    }
    else {      
      return false;    
    }  
  },
  finish: function(){
    var today = new Date();
    return this.startPost <= today ? true : false;
  }
  // comments: function() {    
  //  return Meteor.users.find({postId: this._id});  
  //}
});



