// create marker collection
Markers = new Meteor.Collection('markers');

Meteor.subscribe('markers');

Template.map.rendered = function() {
  L.Icon.Default.imagePath = 'packages/mrt:leaflet/images'

  var map = L.map('map', {
    doubleClickZoom: false
  }).setView([49.25044, -123.137], 13);

  L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);

  if (Markers.find().count() === 0) {
    Markers.insert({_id: '5WHtPcr3EiWwidgfQ', latlng: {lat: '49.240914053166065', lng: '-123.1845474243164'}}),
    Markers.insert({_id: 'vBmSDS4SGoe2kmLhf', latlng: {lat: '49.248086284855496', lng: '-123.18094253540039'}}),
    Markers.insert({_id: 'vBmSDS4SGoe2kmLhf', latlng: {lat: '49.255593598772236', lng: '-123.17596435546876'}}),
    Markers.insert({_id: 'f7aukJbZ9QwywD3iL', latlng: {lat: '49.26321179481485', lng: '-123.17081451416016'}}),
    Markers.insert({_id: 'rcJWFYqXaxLK9WQ7p', latlng: {lat: '49.26063518364422', lng: '-123.17373275756835'}}),
    Markers.insert({_id: 'se8SrrrFeCHjQ65Jo', latlng: {lat: '49.25290454292981', lng: '-123.17853927612303'}}),
    Markers.insert({_id: 'qeGiQEpqrtTdypfy6', latlng: {lat: '49.24584507436022', lng: '-123.18248748779295'}}),
    Markers.insert({_id: 'kttdsNa9D3GFpHXP3', latlng: {lat: '49.26141938389422', lng: '-123.1658363342285'}}),
    Markers.insert({_id: 'FN8K9yBzWy8v5dAgm', latlng: {lat: '49.258282508125454', lng: '-123.16154479980469'}}),
    Markers.insert({_id: 'TS9TwgxuCPYz5f8tB', latlng: {lat: '49.25570563958665', lng: '-123.15673828124999'}}),
    Markers.insert({_id: 'gSBvEiMayRri29eEK', latlng: {lat: '49.25884267913592', lng: '-123.15141677856444'}}),
    Markers.insert({_id: 'mxHkhcaCoZCbohHeN', latlng: {lat: '49.26186749272789', lng: '-123.145751953125'}}),
    Markers.insert({_id: 'MSymiPAyv5yQkFfWg', latlng: {lat: '49.26332381833573', lng: '-123.14043045043947'}}),
    Markers.insert({_id: 'oTeDHwLvEusonzsSw', latlng: {lat: '49.26007503297905', lng: '-123.1357955932617'}}),
    Markers.insert({_id: 'DXAtCih6RXiKcHvQ2', latlng: {lat: '49.25761029452041', lng: '-123.13287734985352'}}),
    Markers.insert({_id: 'xecimyx7wLivYRf4x', latlng: {lat: '49.255593598772236', lng: '-123.12944412231445'}}),
    Markers.insert({_id: 'jDyJdKirzSWWktRLK', latlng: {lat: '49.251896109221754', lng: '-123.12721252441405'}}),
    Markers.insert({_id: '7fQ8QNPezzAetT5PG', latlng: {lat: '49.2489827405684', lng: '-123.12515258789061'}}),
    Markers.insert({_id: 'meAsNFw2dsrALLZ53', latlng: {lat: '49.24506062665235', lng: '-123.12223434448242'}}),
    Markers.insert({_id: 'ifTBDqLEtYAGBZ3jM', latlng: {lat: '49.24304341817789', lng: '-123.12034606933594'}})
  };

  map.on('dblclick', function(event) {
    Markers.insert({latlng: event.latlng});
  });

  var query = Markers.find();
  query.observe({
    added: function(document) {
      var marker = L.marker(document.latlng).addTo(map)
        .on('click', function(event) {
          map.removeLayer(marker);
          Markers.remove({_id: document._id});
        });
    },
    removed: function(oldDocument) {
      layers = map._layers;
      var key, val;
      for (key in layers) {
        val = layers[key];
        if (val._latlng) {
          if (val._latlng.lat === oldDocument.latlng.lat && val._latlng.lng === oldDocument.latlng.lng) {
            map.removeLayer(val);
          }
        }
      }
    }
  });
};
