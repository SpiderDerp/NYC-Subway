

function moveMapToNewYorkCity(map){
  map.setCenter({lat:40.732649357366284, lng:-73.99793998890864});
  map.setZoom(13);
}




var platform = new H.service.Platform({
  apikey: "vYQ0TMZ0_6bGF9HLQbwGVU5BFrfHRCZtvirPMCRQuOw"
});
var defaultLayers = platform.createDefaultLayers();



//Step 2: initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map,{
  center: {lat:40.732649357366284, lng:-73.99793998890864},
  zoom: -9,
  pixelRatio: window.devicePixelRatio || 1
});




window.addEventListener('resize', () => map.getViewPort().resize());





var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));



// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);



// Now use the map as required...
window.onload = function () {
  moveMapToNewYorkCity(map);
}
