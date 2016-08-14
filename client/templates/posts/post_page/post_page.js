Template.postPage.rendered = function() {
  // Initialize Map
  var startPosition = this.data.latlng;
  var map = L.map("mappage").setView(startPosition, 15);
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
  L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
         minZoom: 2,
         maxZoom: 18,
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  //AJOUT DES MARKERS
  var marker = L.marker(this.data.latlng,{icon: greenIcon}).addTo(map);
  //.bindPopup(this.data.address);

};



Template.postPage.helpers({
  comments: function() {    
    return Comments.find({postId: this._id});  
  },
  
  // comments: function() {    
  //  return Meteor.users.find({postId: this._id});  
  //}
});



