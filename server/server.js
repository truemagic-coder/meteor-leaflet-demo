// marker collection
Markers = new Meteor.Collection('markers');
Meteor.publish("markers", function () {
  return Markers.find();
});