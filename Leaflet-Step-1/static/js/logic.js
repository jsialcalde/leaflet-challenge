// Store our API endpoint for all Earthquakes over the past 7 days inside queryUrl
var Url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json( Url, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  console.log(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + "Magnitude: "+feature.properties.mag+ "<br>"+" Latitude: "+(feature.geometry.coordinates[0]) 
      + "<br>"+" Longitude: "+(feature.geometry.coordinates[1])+ "</p>");
  }

    // function onEachFeature(feature, layer) {
    // // Add circles to map
    // layer.circle(feature.properties.place, {
    //     fillOpacity: 0.75,
    //     color: "green",
    //     fillColor: color,
    //     // Adjust radius
    //     radius: feature.properties.mag* 1500
    // }).bindPopup("<h3>" + feature.properties.place +
    // "</h3><hr><p>" + "Magnitude: "+feature.properties.mag+ "<br>"+" Latitude: "+(feature.geometry.coordinates[0]) 
    // + "<br>"+" Longitude: "+(feature.geometry.coordinates[1])+ "</p>").addTo(myMap);
    // }
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });


  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap
    // "Dark Map": darkmap
  };

//   // Create overlay object to hold our overlay layer
//   var overlayMaps = {
//     Earthquakes: earthquakes
//   };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(myMap);
}