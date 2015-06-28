// marker collection
var Markers = new Meteor.Collection('markers');
Meteor.publish("markers", function () {
  return Markers.find();
});

// Listen to incoming HTTP requests, can only be used on the server
WebApp.connectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});

// setup local CORS for Cordova testing
BrowserPolicy.content.allowOriginForAll("http://meteor.local");
