// basic info
App.info({
  name: 'meteor-leaflet-demo',
  description: 'Meteor Leaflet Demo',
  author: 'Bevan Hunt',
  email: 'bevan@bevanhunt.com',
  website: 'http://bevanhunt.com'
});

// CORS for Meteor app
App.accessRule('meteor.local/*');
// allow tiles
App.accessRule('*.openstreetmap.org/*');
App.accessRule('stamen-tiles-a.a.ssl.fastly.net/*');
App.accessRule('stamen-tiles-b.a.ssl.fastly.net/*');
App.accessRule('stamen-tiles-c.a.ssl.fastly.net/*');
App.accessRule('stamen-tiles-d.a.ssl.fastly.net/*');
