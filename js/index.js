var map = L.map('map').setView([37.95451, -91.77386], 17);

/*
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery   <a href="http://cloudmade.com">CloudMade</a>',
    subdomain: ['a','b','c'],
    maxZoom: 25,
}).addTo(map);
*/
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
            var type = e.layerType,
                layer = e.layer;
            drawnItems.addLayer(layer);
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

var Math_Building = {
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
                        [-91.774215, 37.95345],   // 1 Very bottom left
                        [-91.774215, 37.95350],   // 2 Bottom left corn.
                        [-91.77427,  37.95350],   // 3
                        [-91.77427,  37.9536],    // 4
                        [-91.774215, 37.9536],    // 5
                        [-91.774215, 37.95365],   // 6
                        [-91.77401,  37.95365],   // 7
                        [-91.77401,  37.9536],    // 8
                        [-91.77395,  37.9536],    // 9
                        [-91.77395,  37.95350],   // 10
                        [-91.77401,  37.95350],   // 11
                        [-91.77401, 37.95345]     // 12

        ]]
    }
};
/*
var Rolla_Building = new L.Indoor(Math_Building);

Rolla_Building.setLevel("0");

Rolla_Building.addTo(map);

var levelControl = new L.control.level({
    level: "0",
    //levels: Rolla_Building.getLevels()
});

levelControl.addEventListener("levelchange", Rolla_Building.setLevel, Rolla_Building);

levelControl.addTo(map);

//L.geoJson(Math_Building).addTo(map);
*/

var temp = 'css/images/temp.PNG', imageBounds = [[37.953699, -91.77432], [37.953398, -91.77390]]; // Math Building G

var temp_1 = L.imageOverlay(temp, imageBounds);

temp_1.addTo(map);

temp_1.setOpacity(.8);

$("#print").click(function(){
	$.each(drawnItems._layers,function(index,value){
		var popup = L.popup();
		$(value).click(function(){
			var lat = ( (this._latlngs[0]['lat'] + this._latlngs[2]['lat']) / 2 );
			var lng = ( (this._latlngs[0]['lng'] + this._latlngs[2]['lng']) / 2 );
			var content = "";
			
			this._latlngs.forEach(function(value){
				content = content + value['lat']+' , ' + value['lng'] + '<br><br>';
			});

			var update = confirm("Update Room Number/name?");
			if(update){
				this.roomName = prompt("Name",'Room #');
			}
			
			popup.setLatLng([lat,lng])
			     .setContent(String(this.roomName)+'<br><br>'+content)
			     .openOn(map);
        	});
	})
});
