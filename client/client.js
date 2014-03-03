// create marker collection
Markers = new Meteor.Collection('markers')

Meteor.subscribe('markers')

Template.map.rendered = function() {
  // create default image path
  L.Icon.Default.imagePath = 'packages/leaflet/images';

  // create a map in the map div, set the view to a given place and zoom
  var map = L.map('map', {
    doubleClickZoom: false
  }).setView([49.25044, -123.137], 13);

  L.tileLayer.provider('OpenStreetMap.Mapnik').addTo(map);

  map.on('dblclick', function(event) {
    Markers.insert({latlng: event.latlng});
  });

  // watch the markers collection  
  var query = Markers.find({});
  query.observe({
    // when new marker - then add to map and when on click then remove
    added: function(mark) {
      L.marker(mark.latlng).addTo(map)
        .on('click', function(event) {
          // remove the Meteor way (by id and not selector)
          Markers.remove({ _id: mark._id });
        });
    },
    // when removing marker - loop through all layers on the map
    // and remove the matching layer (marker)
    removed: function(mark) {
      var layers = map._layers;
      // ECMA 5+
      Object.keys(layers).forEach(function(key) {
        var val = layers[key];
        if (val._latlng && val._latlng.equals(mark.latlng)) {
          map.removeLayer(val);
        }
      });
    }
  });
};
