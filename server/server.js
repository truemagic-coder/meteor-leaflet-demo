var GeoJSON = Meteor.npmRequire('geojson');

Meteor.methods({
   'getGeoJSON': function getGeoJSON() {
     var points = [
       { name: 'Location A', category: 'Store', street: 'Market', lat: 49.25044, lng: -123.137 }
     ];
     return GeoJSON.parse(points, {Point: ['lat', 'lng']});
   }
 });

// Listen to incoming HTTP requests, can only be used on the server
WebApp.connectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});
