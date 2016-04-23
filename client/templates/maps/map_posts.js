Template.mapPosts.rendered = function() {
  // Initialize Map
  var startPosition = [48.8588, 2.350];
  var map = L.map("map").setView(startPosition, 13);

  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
  L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
         minZoom: 2,
         maxZoom: 18,
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
     }).addTo(map);

//AJOUT DES MARKERS
     // var query = Incidents.find();
     // query.observe({
     //   added: function (document) {
     //     var marker = L.marker(document.latlng).addTo(map)
     //     .bindPopup('Incident:'+document.type+'<br>Signalé le'+document.createdAt+'!')

          //  .on('click', function(event) {
          //    map.removeLayer(marker);
          //    Markers.remove({_id: document._id});
          //  });
       //}  });
    //ADD marker

    //L.marker([48.8588, 2.350]).addTo(map).bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

  // map.on('dblclick', function(event) {
  //   Markers.insert({latlng: event.latlng});
  // });
  //
  // var query = Markers.find();
  // query.observe({
  //   added: function (document) {
  //     var marker = L.marker(document.latlng).addTo(map)
  //     .on('click', function(event) {
  //       map.removeLayer(marker);
  //       Markers.remove({_id: document._id});
  //     });
  //   },
  //   removed: function (oldDocument) {
  //     layers = map._layers;
  //     var key, val;
  //     for (key in layers) {
  //       val = layers[key];
  //       if (val._latlng) {
  //         if (val._latlng.lat === oldDocument.latlng.lat && val._latlng.lng === oldDocument.latlng.lng) {
  //           map.removeLayer(val);
  //         }
  //       }
  //     }
  //   }
  // });
};