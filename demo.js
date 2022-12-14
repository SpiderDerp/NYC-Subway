var bubble;
var display;
var weatherData;
var coords;
var name;
var datascore;
//https://media.discordapp.net/attachments/827947440945627167/1006985824560230501/blue-marker.png
//https://media.discordapp.net/attachments/827947440945627167/1008739838306029609/blue-marker.png
//https://media.discordapp.net/attachments/827947440945627167/1008740342960504912/blue-marker.png
//https://media.discordapp.net/attachments/827947440945627167/1008742666961424414/blue-marker.png
function addMarkersToMap(map) {
  var icon = new H.map.Icon('https://media.discordapp.net/attachments/827947440945627167/1008744283467173918/blue-marker.png?width=424&height=590', { size: { w: 35.9, h: 50 } });
  var oneMarker = new H.map.Marker({ lat: 40.75641340801819, lng: -73.98701811453235 }, { icon: icon });
  map.addObject(oneMarker);

  var twoMarker = new H.map.Marker({ lat: 40.753021136222415, lng: -73.97752984522153 }, { icon: icon });
  map.addObject(twoMarker);

  var threeMarker = new H.map.Marker({ lat: 40.75060674516795, lng: -73.98804119919043 }, { icon: icon });
  map.addObject(threeMarker);

  var fourMarker = new H.map.Marker({ lat: 40.73526397230171, lng: -73.99038697247614 }, { icon: icon });
  map.addObject(fourMarker);

  var fiveMarker = new H.map.Marker({ lat: 40.709651443071834, lng: -74.00833181211024 }, { icon: icon });
  map.addObject(fiveMarker);

  var sixMarker = new H.map.Marker({ lat: 40.75293886696237, lng: -73.9934788605656 }, { icon: icon });
  map.addObject(sixMarker);

  var eightMarker = new H.map.Marker({ lat: 40.76926930516256, lng: -73.98136799918349 }, { icon: icon });
  map.addObject(eightMarker);

  var nineMarker = new H.map.Marker({ lat: 40.74738892124231, lng: -73.89082696850369 }, { icon: icon });
  map.addObject(nineMarker);

  var tenMarker = new H.map.Marker({ lat: 40.7589188801231, lng: -73.83040571453132 }, { icon: icon });
  map.addObject(tenMarker);

  var elevenMarker = new H.map.Marker({ lat: 40.731242937854574, lng: -73.99217485316575 }, { icon: icon });
  map.addObject(elevenMarker);

  var twelveMarker = new H.map.Marker({ lat: 40.74064995147205, lng: -74.00289137591425 }, { icon: icon });
  map.addObject(twelveMarker);

  var thirteenMarker = new H.map.Marker({ lat: 40.74067697084957, lng: -73.98629286850621 }, { icon: icon });
  map.addObject(thirteenMarker);

  var fourteenMarker = new H.map.Marker({ lat: 40.73071146341542, lng: -73.99096597591792 }, { icon: icon });
  map.addObject(fourteenMarker);

  var fifteenMarker = new H.map.Marker({ lat: 40.68419913615695, lng: -73.97867156931275 }, { icon: icon });
  map.addObject(fifteenMarker);

  var sixteenMarker = new H.map.Marker({ lat: 40.72594213392374, lng: -73.99466200600531}, { icon: icon });
  map.addObject(sixteenMarker);

  var seventeenMarker = new H.map.Marker({ lat: 40.72583672845734, lng: -74.00400575788326 }, { icon: icon });
  map.addObject(seventeenMarker);

  var eighteenMarker = new H.map.Marker({ lat: 40.719633688930394, lng: -74.001745815253 }, { icon: icon });
  map.addObject(eighteenMarker);

  var nineteenMarker = new H.map.Marker({ lat: 40.71201302816927, lng: -74.00501357107485}, { icon: icon });
  map.addObject(nineteenMarker);

  var twentyMarker = new H.map.Marker({ lat: 40.707746774840906, lng: -74.01168632874632}, { icon: icon });
  map.addObject(twentyMarker);

  var twentyoneMarker = new H.map.Marker({ lat: 40.704932778894815, lng: -74.0144917882671 }, { icon: icon });
  map.addObject(twentyoneMarker);

  var twentytwoMarker = new H.map.Marker({ lat: 40.69400759497469, lng: -73.99040172874662 }, { icon: icon });
  map.addObject(twentytwoMarker);

  var twentythreeMarker = new H.map.Marker({ lat: 40.57732852138938, lng: -73.98147353614705 }, { icon: icon });
  map.addObject(twentythreeMarker);
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
  defaultLayers.raster.normal.mapnight, {
  center: { lat: 40.732649357366284, lng: -73.99793998890864 },
  zoom: -9,
  pixelRatio: window.devicePixelRatio || 1
});
map.addEventListener('tap', function(evt) {

  coords = evt.target.getGeometry().toString();

  name = getName(coords);
  datascore = getScore(name);
  weatherData = getHazardCount(name);
  bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
    // read custom data
    content: `<h1 class='station-name' id='Station-Name'>${name}</h1>
              <div class='buttons-container'>
                <button class='cell-service' id='cell-button' onClick='displayCell()'>Cell Service</button>
                <button class='hazards-button' id='hazard-button' onClick='displayHaz()'>Hazards + Weather</button>
              </div>
              <div class = 'service-box'>
                <p><b>Service Rating:</b> ${datascore.datascore}</p>
                <p><b>Provider Breakdown:</b><br>
                    AT&T: ${datascore.att}<br>
                    T-Mobile: ${datascore.tmobile}<br>
                    Verizon: ${datascore.verizon}<br>
                    Sprint: ${datascore.sprint}<br>
                    MetroPCS: ${datascore.metropcs}<br>
                    Cricket: ${datascore.cricket}<br>
                    Other: ${datascore.other}<br>
                </p>
              </div>`
  });
  // show info bubble
  ui.addBubble(bubble);
}, false);


function displayCell() {
  datascore = datascore;
  bubble.setContent(
    `<h1 class='station-name' id='Station-Name'>${name}</h1>
    <div class='buttons-container'>
      <button class='cell-service' id='cell-button' onClick='displayCell()'>Cell Service</button>
      <button class='hazards-button' id='hazard-button' onClick='displayHaz()'>Hazards + Weather</button>
    </div>
    <div class = 'service-box'>
      <p><b>Service Rating:</b> ${datascore.datascore}</p>
      <p><b>Provider Breakdown:</b><br>
          AT&T: ${datascore.att}<br>
          T-Mobile: ${datascore.tmobile}<br>
          Verizon: ${datascore.verizon}<br>
          Sprint: ${datascore.sprint}<br>
          MetroPCS: ${datascore.metropcs}<br>
          Cricket: ${datascore.cricket}<br>
          Other: ${datascore.other}<br>
      </p>
    </div>`
  );
}

function displayHaz() {
  weatherData = weatherData;
  bubble.setContent(
    `<h1 class='station-name'>${name}</h1>
    <div class='buttons-container'>
      <button class='cell-service' id='cell-button' onClick='displayCell()'>Cell Service</button>
      <button class='hazards-button' id='hazard-button' onClick='displayHaz()'>Hazards + Weather</button>
    <div class = 'hazards-box'>
      <p><b>Hazards Reported:</b> ${weatherData.count}</p>
      <p><b>Precipitation:</b> ${weatherData.lastWeather}</p>
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
  getJSON('https://nyc-subways-740bc-default-rtdb.firebaseio.com/cell-service.json', function(err, data) {

    if (err != null) {
      console.error(err);
    } else {

      display = data;
    }
    display = display;
  });

  getJSON('https://nyc-subways-740bc-default-rtdb.firebaseio.com/weather-hazard-data.json', function(err, data) {

    if (err != null) {
      console.error(err);
    } else {

      weatherData = data;
    }
    weatherData = weatherData;
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
      var name = "Times Square-42 St.";
      break;
    case "POINT (-73.97752984522153 40.753021136222415)":
      var name = "Grand Central-42 St.";
      break;
    case "POINT (-73.98804119919043 40.75060674516795)":
      var name = "34 St-Herald Square";
      break;
    case "POINT (-73.99038697247614 40.73526397230171)":
      var name = "14 St-Union Square";
      break;
    case "POINT (-74.00833181211024 40.709651443071834)":
      var name = "Fulton St.";
      break;
    case "POINT (-73.9934788605656 40.75293886696237)":
      var name = "34 St-Penn Station";
      break;
    case "POINT (-73.98136799918349 40.76926930516256)":
      var name = "59 St-Columbus Circle";
      break;
    case "POINT (-73.89082696850369 40.74738892124231)":
      var name = "74 St-Broadway";
      break;
    case "POINT (-73.83040571453132 40.7589188801231)":
      var name = "Flushing-Main St.";
      break;
    case "POINT (-73.99217485316575 40.731242937854574)":
      var name = "8 St-NYU";
      break;
    case "POINT (-74.00289137591425 40.74064995147205)":
      var name = "14 St.";
      break;
    case "POINT (-73.98629286850621 40.74067697084957)":
      var name = "23 St.";
      break;
    case "POINT (-73.99096597591792 40.73071146341542)":
      var name = "Astor Place";
      break;
    case "POINT (-73.97867156931275 40.68419913615695)":
      var name = "Atlantic Ave-Barclays Ctr.";
      break;
    case "POINT (-73.99466200600531 40.72594213392374)":
      var name = "Bleecker St.";
      break;
    case "POINT (-74.00400575788326 40.72583672845734)":
      var name = "Spring St.";
      break;
    case "POINT (-74.001745815253 40.719633688930394)":
      var name = "Canal St.";
      break;
    case "POINT (-74.00501357107485 40.71201302816927)":
      var name = "Brooklyn Bridge-City Hall";
      break;
    case "POINT (-74.01168632874632 40.707746774840906)":
      var name = "Wall St.";
      break;
    case "POINT (-74.0144917882671 40.704932778894815)":
      var name = "Bowling Green";
      break;
    case "POINT (-73.99040172874662 40.69400759497469)":
      var name = "Borough Hall";
      break;
    case "POINT (-73.98147353614705 40.57732852138938)":
      var name = "Coney Island-Stillwell Ave.";
      break;
    default:
      var name = "N/A"
  }
  return name;
}
function getScore(name) {
  let name2 = name;
  let datascore = 0;
  let count = 0;
  let att = tmobile = verizon = sprint = metropcs = cricket = other = 0;
  display = display;
  for (let i = 0; i < display.length; i++) {
    if (display[i][0].toString().includes(name2.toString())) {
      if (display[i][3].toString() == "4+") {
        datascore += 4;
      }
      else {
        datascore += parseInt(display[i][3].toString());
      }
      switch (display[i][2].toString()) {
        case "3G/LTE":
          datascore += 30;
          break;
        case "4G/5Ge":
          datascore += 40;
          break;
        case "5G/5G+":
          datascore += 50;
          break;
      }
      switch (display[i][1].toString()) {
        case "AT&T":
          att++;
          break;
        case "T-Mobile":
          tmobile++;
          break;
        case "Verizon":
          verizon++;
          break;
        case "Sprint":
          sprint++;
          break;
        case "MetroPCS":
          metropcs++;
          break;
        case "Cricket":
          cricket++;
          break;
        case "Other":
          other++;
          break;
      }
      count++;
    }
  }
  datascore = datascore / count;
  switch (parseInt(datascore / 10)) {
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
  return { datascore, att, tmobile, verizon, sprint, metropcs, cricket, other };
}

function getHazardCount(name) {
  let name2 = name;
  let count = 0;
  weatherData = weatherData;
  let lastWeather = "N/A";
  for (let i = 0; i < weatherData.length; i++) {
    if (weatherData[i][0].toString().includes(name2.toString())) {
      if (weatherData[i][3].toString() != "None")
        count++;
      lastWeather = weatherData[i][1].toUpperCase();
    }
  }
  return { count, lastWeather };
}
