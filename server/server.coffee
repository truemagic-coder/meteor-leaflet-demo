# marker collection
Markers = new Meteor.Collection('markers')
Meteor.publish 'markers', -> Markers.find()

# startup - populate markers?
Meteor.startup ->