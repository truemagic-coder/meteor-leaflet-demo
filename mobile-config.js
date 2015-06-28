// basic info
App.info({
  name: 'meteor-leaflet-demo',
  description: 'Meteor Leaflet Demo',
  author: 'Bevan Hunt',
  email: 'bevan@bevanhunt.com',
  website: 'http://bevanhunt.com'
});

// CORS for Meteor app
App.accessRule('http://meteor.local/*');
// allow tiles
App.accessRule('*.openstreetmap.org/*');
App.accessRule('*.tile.thunderforest.com/*');
