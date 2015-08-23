var tj = Meteor.npmRequire('togeojson');
var jsdom = Meteor.npmRequire('jsdom').jsdom;

Meteor.methods({
   'getGeoJSON': function getGeoJSON() {
     var kml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><kml xmlns=\"http://www.opengis.net/kml/2.2\"><Placemark><name>Simple placemark</name><Point><coordinates>-123.137,49.25044,0</coordinates></Point></Placemark>";
     var converted = jsdom(kml);
     return tj.kml(converted);
   }
 });

// Listen to incoming HTTP requests, can only be used on the server
WebApp.connectHandlers.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  return next();
});
