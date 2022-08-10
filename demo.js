var bubble;
var display;
var coords;
var name;
var datascore;

function addMarkersToMap(map) {
  var icon = new H.map.Icon('https://media.discordapp.net/attachments/827947440945627167/1006985824560230501/blue-marker.png', { size: { w: 35.9, h: 50 } });
  var oneMarker = new H.map.Marker({ lat: 40.75641340801819, lng: -73.98701811453235 }, {icon: icon});
  map.addObject(oneMarker);

  var twoMarker = new H.map.Marker({ lat: 40.753021136222415, lng: -73.97752984522153 }, {icon: icon});
  map.addObject(twoMarker);

  var threeMarker = new H.map.Marker({ lat: 40.75060674516795, lng: -73.98804119919043 }, {icon: icon});
  map.addObject(threeMarker);

  var fourMarker = new H.map.Marker({ lat: 40.73526397230171, lng: -73.99038697247614 }, {icon: icon});
  map.addObject(fourMarker);

  var fiveMarker = new H.map.Marker({ lat: 40.709651443071834, lng: -74.00833181211024 }, {icon: icon});
  map.addObject(fiveMarker);

  var sixMarker = new H.map.Marker({ lat: 40.75293886696237, lng: -73.9934788605656 }, {icon: icon});
  map.addObject(sixMarker);

  var eightMarker = new H.map.Marker({ lat: 40.76926930516256, lng: -73.98136799918349 }, {icon: icon});
  map.addObject(eightMarker);

  var nineMarker = new H.map.Marker({ lat: 40.74738892124231, lng: -73.89082696850369 }, {icon: icon});
  map.addObject(nineMarker);

  var tenMarker = new H.map.Marker({ lat: 40.7589188801231, lng: -73.83040571453132 }, {icon: icon});
  map.addObject(tenMarker);

  var elevenMarker = new H.map.Marker({ lat: 40.731242937854574, lng: -73.99217485316575 }, {icon: icon});
  map.addObject(elevenMarker);

  var twelveMarker = new H.map.Marker({ lat: 40.74064995147205, lng: -74.00289137591425 }, {icon: icon});
  map.addObject(twelveMarker);

  var thirteenMarker = new H.map.Marker({ lat: 40.74067697084957, lng: -73.98629286850621 }, {icon: icon});
  map.addObject(thirteenMarker);

  var fourteenMarker = new H.map.Marker({ lat: 40.73071146341542, lng: -73.99096597591792 }, {icon: icon});
  map.addObject(fourteenMarker);

}

function moveMapToNewYorkCity(map) {
  map.setCenter({ lat: 40.732649357366284, lng: -73.99793998890864 });
  map.setZoom(13);
}

var platform = new H.service.Platform({
  apikey: "YuQGXEOvrk2FQTvPwQFQk5F0DRpXfLEo_rw0LinICiE"
});
var defaultLayers = platform.createDefaultLayers();


//Step 2: initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: { lat: 40.732649357366284, lng: -73.99793998890864 },
  zoom: -9,
  pixelRatio: window.devicePixelRatio || 1
});

map.addEventListener('tap', function(evt) {

  coords = evt.target.getGeometry().toString();

  name = getName(coords);
  datascore = getScore(name);
  
  bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
    // read custom data
    content: `<h1 class='station-name' id='Station-Name'>${name}</h1>
              <div class='buttons-container'>
                <button class='cell-service' id='cell-button' onClick='displayCell()'>Cell Service</button>
                <button class='hazards-button' id='hazard-button' onClick='displayHaz()'>Hazards + Weather</button>
              </div>
              <div class = 'service-box'>
                <p><b>Service Rating:</b> ${datascore}</p>
              </div>`
  });
  // show info bubble
  ui.addBubble(bubble);
}, false);


function displayCell() {


  bubble.setContent(
    `<h1 class='station-name' id='Station-Name'>${name}</h1>
    <div class='buttons-container'>
      <button class='cell-service' id='cell-button' onClick='displayCell()'>Cell Service</button>
      <button class='hazards-button' id='hazard-button' onClick='displayHaz()'>Hazards + Weather</button>
    </div>
    <div class = 'service-box'>
      <p><b>Service Rating:</b> ${datascore}</p>
    </div>`
  );
}

function displayHaz() {
  
  bubble.setContent(
    `<h1 class='station-name'>${name}</h1>
    <div class='buttons-container'>
      <button class='cell-service' id='cell-button' onClick='displayCell()'>Cell Service</button>
      <button class='hazards-button' id='hazard-button' onClick='displayHaz()'>Hazards + Weather</button>
    <div class = 'hazards-box'>
      <p><b>Hazards Reported:</b> 0</p>
      <p><b>Precipitation:</b> None</p>
    </div>`
  );
}
window.addEventListener('resize', () => map.getViewPort().resize());


var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);
// Now use the map as required...
window.onload = function() {
  moveMapToNewYorkCity(map);
  addMarkersToMap(map);
//https://nyc-subways-740bc-default-rtdb.firebaseio.com/cell-service.json
  getJSON('https://nyc-subways-740bc-default-rtdb.firebaseio.com/cell-service.json',  function(err, data) {
  
      if (err != null) {
          console.error(err);
      } else {
  
        display = data;
      }
    display=display;
  });

}

var getJSON = function(url, callback) {

    var xmlhttprequest = new XMLHttpRequest();
    xmlhttprequest.open('GET', url, true);
    xmlhttprequest.responseType = 'json';

    xmlhttprequest.onload = function() {

        var status = xmlhttprequest.status;

        if (status == 200) {
            callback(null, xmlhttprequest.response);
        } else {
            callback(status, xmlhttprequest.response);
        }
    };

    xmlhttprequest.send();
};

function getName(coords) {
  switch (coords.toString()) {
    case "POINT (-73.98701811453235 40.75641340801819)":
      var name = "Times Sq 42nd st";
      break;
    case "POINT (-73.97752984522153 40.753021136222415)":
      var name = "Grand Central 42nd st";
      break;
    case "POINT (-73.98804119919043 40.75060674516795)":
      var name = "34th st Herald Sq";
      break;
    case "POINT (-73.99038697247614 40.73526397230171)":
      var name = "14th st Union Sq";
      break;
    case "POINT (-74.00833181211024 40.709651443071834)":
      var name = "Fulton st";
      break;
    case "POINT (-73.9934788605656 40.75293886696237)":
      var name = "34th st Penn Station";
      break;
    case "POINT (-73.98136799918349 40.76926930516256)":
      var name = "59th st Columbus Circle";
      break;
    case "POINT (-73.89082696850369 40.74738892124231)":
      var name = "74 Broadway";
      break;
    case "POINT (-73.83040571453132 40.7589188801231)":
      var name = "Flushing Main st";
      break;
    case "POINT (-73.99217485316575 40.731242937854574)":
      var name = "8th st";
      break;
    case "POINT (-74.00289137591425 40.74064995147205)":
      var name = "14th st/8th Ave";
      break;
    case "POINT (-73.98629286850621 40.74067697084957)":
      var name = "23rd st";
      break;
    case "POINT (-73.99096597591792 40.73071146341542)":
      var name = "Astor Place";
      break;
    default:
      var name = "N/A"
  }
  return name;
}
function getScore(name){
  let name2 = name;
  let datascore = 0;
  let count = 0;
  display = display;
  for(let i = 0; i < display.length; display++){
    if(display[i][0].toString() == name2.toString()){
      if(display[i][3].toString() == "4+"){
        datascore += 4;
      }
      else {
        datascore += parseInt(display[i][3].toString());
      }
      switch (display[i][2].toString()) {
        case "3G/LTE":
          datascore+=30;
          break;
        case "4G/5Ge":
          datascore+=40;
          break;
        case "5G/5G+":
          datascore+=50;
          break;
      }
      count++;
    }
  }
  datascore = datascore/count;
  switch (datascore%10) {
    case 5:
      datascore = "Good";
      break;
    case 4:
      datascore = "Fair";
      break;
    case 3:
      datascore = "Poor";
      break;
    default:
      datascore = "N/A";
  }
  return datascore;
}