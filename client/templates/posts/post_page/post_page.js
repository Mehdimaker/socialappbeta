Template.postPage.rendered = function() {
  // Initialize Map
  var startPosition = this.data.latlng;
  var map = L.map("mappage").setView(startPosition, 13);

  L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images';
  L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
         minZoom: 2,
         maxZoom: 18,
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
     }).addTo(map);

  var marker = L.marker(this.data.latlng).addTo(map)
  .bindPopup(this.data.title+'<br>Type:'+this.data.type+'!');
}



Template.postPage.helpers({
  comments: function() {    
    return Comments.find({postId: this._id});  
  },
  
  // comments: function() {    
  //  return Meteor.users.find({postId: this._id});  
  //}
});




