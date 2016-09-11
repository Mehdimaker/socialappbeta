Template.postsMap.rendered = function() {
  let newHeight = $(window).height() -(68 *2)-54;
  console.log(newHeight);
  document.getElementById("map").style.height = newHeight.toString() + "px" ;
  // Initialize Map
  var startPosition = [48.8588, 2.350];
  var map = L.map("map").setView(startPosition, 10);
  // definiton icon
   var greenIcon = L.icon({
      iconUrl: '/location-pin.png',
      shadowUrl: '/marker-shadow.png',
      iconSize:     [32, 32], // size of the icon
      shadowSize:   [41, 41], // size of the shadow
      iconAnchor:   [16,32], // point of the icon which will correspond to marker's location
      shadowAnchor: [12,41],  // the same for the shadow
      popupAnchor:  [0, -32] // point from which the popup should open relative to the iconAnchor
  });
  // AJOUT de titleLayer
  L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
         minZoom: 2,
         maxZoom: 18,
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  //AJOUT DES MARKERS
  var posts = Posts.find().fetch();
  for (let i in posts){
    if(posts[i].latlng){
        var marker = L.marker(posts[i].latlng, {icon: greenIcon}).addTo(map)
        .bindPopup(`
        <h3 class="ui header">${posts[i].title}
          <div class="sub header">${posts[i].address}</div>
        </h3>
        <a class="ui tiny fluid button" href="posts/${posts[i]._id}">Go!</a>`);
    }
  }

};