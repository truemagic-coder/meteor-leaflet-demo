// on startup run resizing event
Meteor.startup(function() {
  $(window).resize(function() {
    $('#map').css('height', window.innerHeight - 82 - 45);
  });
  $(window).resize(); // trigger resize event
});

Template.map.rendered = function() {
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

  var map = L.map('map', {
    doubleClickZoom: false
  }).setView([49.25044, -123.137], 13);

  L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);
  Meteor.startup(function() {
    Meteor.call('getGeoJSON', function(err, result) {
      if (err) {
        console.log(err);
      } else {
        L.geoJson(result).addTo(map);
      }
    });
  });
};
