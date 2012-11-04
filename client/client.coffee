# create marker collection
Meteor.subscribe('markers')
Markers = new Meteor.Collection('markers')

# resize the layout
window.resize = (t) ->
  w = window.innerWidth
  h = window.innerHeight
  top = t.find('#map').offsetTop
  c = w - 40
  m = (h-top) - 65 
  t.find('#container').style.width = "#{c}px"
  t.find('#map').style.height = "#{m}px" 

Template.map.rendered = ->
  # resize on load
  window.resize(@)

  # resize on resize of window
  $(window).resize =>
    window.resize(@)

  # create default image path
  L.Icon.Default.imagePath = '../../leaflet'

  # create a map in the map div, set the view to a given place and zoom
  window.map = L.map 'map', 
    doubleClickZoom: false
  .setView([49.25044, -123.137], 13)

  # add a CloudMade tile layer with style #997 - use your own cloudmade api key
  L.tileLayer "http://{s}.tile.cloudmade.com/#{window.cloudmade}/997/256/{z}/{x}/{y}.png", 
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
  .addTo(window.map)
  
  # click on the map and will insert the latlng into the markers collection 
  window.map.on 'dblclick', (e) ->
    Markers.insert
      latlng: e.latlng

  # watch the markers collection
  query = Markers.find({})
  query.observe
    # when new marker - then add to map and when on click then remove
    added: (mark) ->
      marker = L.marker(mark.latlng)
      .addTo(window.map)
      .on 'click', (e) ->
        Markers.remove({latlng: @._latlng})
    # when removing marker - loop through all layers on the map and remove the matching layer (marker)
    # matching based on matching lat/lon
    removed: (mark) ->
      layers = window.map._layers
      for key, val of layers
        if !val._latlng
        else
          if val._latlng.lat is mark.latlng.lat and val._latlng.lng is mark.latlng.lng
            window.map.removeLayer(val)