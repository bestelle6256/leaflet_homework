var CenterCoords = [40.76, -111.89];
var mapZoomLevel = 5; // the smaller the number is the more zoomed out the map is
 
 
/////////// Background map ///////////////
var myMap = L.map("map", {
  center: CenterCoords,
  zoom: mapZoomLevel,
});


lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


/////////// data for "2.5+ earthquakes for the past 6 months"
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"

d3.json(url, function(data) {

  EarthquakeMap(data.features);


  function EarthquakeMap (earthquake_data) {
    
    var earthquakes = L.geoJson(earthquake_data, {
      
      onEachFeature: draw_circle

      ////////// ??? How to remove the markers from the GeoJson layer? ////////

      // pointToLayer: function (feature, latlng) {
      //   return L.Marker(latlng,{radius:1,fillOpacity:0.5}).addTo(myMap);
      // }

    });

    earthquakes.addTo(myMap);

  }


  function draw_circle (feature) {

    // successfully printed
      console.log("coordinates: ", feature.geometry.coordinates); 
      console.log("lat: ",feature.geometry.coordinates[0])
      console.log("lng: ",feature.geometry.coordinates[1])
      console.log("radius: ",feature.properties.mag);

    L.circle([feature.geometry.coordinates[1],feature.geometry.coordinates[0]], {
      fillOpacity: 1,
      color: "#000000",
      fillColor: getColor(feature.properties.mag),
      stroke: true,
      weight: 0.5,
      radius: feature.properties.mag*20000}).addTo(myMap);



  };


  function getColor(magnitude) {
    switch (true) {
    case magnitude > 5:
      return "#ea2c2c";
    case magnitude > 4:
      return "#ea822c";
    case magnitude > 3:
      return "#ee9c00";
    case magnitude > 2:
      return "#eecc00";
    case magnitude > 1:
      return "#d4ee00";
    default:
      return "#98ee00";
    }
  }

});