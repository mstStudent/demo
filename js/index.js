var map = L.map('map').setView([37.95451, -91.77386], 17);

/*
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery   <a href="http://cloudmade.com">CloudMade</a>',
    subdomain: ['a','b','c'],
    maxZoom: 25,
}).addTo(map);
*/


// TODO: Move items below


// Initialise the FeatureGroup to store editable layers
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems)

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    }
});
map.addControl(drawControl);

map.on('draw:created', function (e) {
	var popup = L.popup();
	var type = e.layerType,
		layer = e.layer;
	drawnItems.addLayer(layer);
	var content = "";
	layer._latlngs.forEach(function(value){
		content = content + value['lat']+' , ' + value['lng'] + '<br><br>';
	});
	var update = confirm("Already Know the Room Number/name?");
		if(update){
			layer.roomName = prompt("Name",'Room #');
		}
	popup.setContent(String(layer.roomName)+'<br>'+content)
	
	layer.bindPopup(popup).openPopup();
	
	layer.on('click',function(){
		var popup = L.popup();
		var content = "";
		layer._latlngs.forEach(function(value){
			content = content + value['lat']+' , ' + value['lng'] + '<br><br>';
		});
		var update = confirm("Update the Room Number/name?");
			if(update){
				layer.roomName = prompt("Name",'Room #');
			}
		popup.setContent(String(layer.roomName)+'<br>'+content)
		
		layer.bindPopup(popup).openPopup();
	});
});

L.control.mousePosition().addTo(map);
/*
function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

//    Temp blocks to be removed

// Add click listener to map

map.on('click', onMapClick);

var popup = L.popup();
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);
*/
// End of temp blocks
/*

var temp_1 = L.icon({
	iconUrl: 'css/images/Capture_4_test.PNG',
//	iconSize: [24,24]
});

L.marker([37.953699, -91.77432], {icon:temp_1, draggable: true}).addTo(map);
*/
/*
var temp = 'css/images/Capture_4_test.PNG', imageBounds = [[37.953699, -91.77432], [37.953398, -91.77390]]; // Math Building G

var temp_1 = L.imageOverlay(temp, imageBounds);

temp_1.addTo(map);

temp_1.setOpacity(.5);

*/

//var queryURL = 'http://www.openstreetmap.org/api/0.6/map?bbox=-91.78592,37.94986606322165,-91.77086,37.96036'

var queryURL = '/includes/map.xml'

$.get(queryURL, function(data){
  var geoJSON = osmtogeojson(data, {
  	polygonFeatures:{
		buildingpart: true
	  }
  });/*
  var indoorLayer = new L.Indoor(geoJSON, {
                getLevel: function(feature) { 
                    if (feature.properties.relations.length === 0)
                        return null;

                    return feature.properties.relations[0].reltags.level;
                },
                onEachFeature: function(feature, layer) {
                    layer.bindPopup(JSON.stringify(feature.properties, null, 4));
                },
                style: function(feature) {
                    var fill = 'white';

                    if (feature.properties.tags.buildingpart === 'corridor') {
                        fill = '#169EC6';
                    } else if (feature.properties.tags.buildingpart === 'verticalpassage') {
                        fill = '#0A485B';
                    }

                    return {
                        fillColor: fill,
                        weight: 1,
                        color: '#666',
                        fillOpacity: 1
                    };
                }
            });

            indoorLayer.setLevel("0");

            indoorLayer.addTo(map);

            var levelControl = new L.Control.Level({
                level: "0",
                levels: indoorLayer.getLevels()
            });
            levelControl.addEventListener("levelchange", indoorLayer.setLevel, indoorLayer);

            levelControl.addTo(map);
*/
   L.geoJson(geoJSON).addTo(map);
});


$("#convert").click(function(){
	console.log("click");
});
