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
/*
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

/*
function innerArea(coor,ty,name,purpose,lev){
	 var section = {};
	 section.geometry = {};
	 section.properties = {};
	 
	 section.geometry.coordinates = [coor];
	 section.geometry.type = ty;
	 section.id = name;
	 section.properties.buildingpart = purpose;
	 section.properties.level = lev;
	 section.type = "Feature";
	 
	 return section
}

function building(){
	var data = {}
	data.features = [];
	
	
	var coordinates = [
			[-91.77426718175411 , 37.95358938864081],
			[-91.77421445958316 , 37.95358919036457],
			[-91.77421462722123 , 37.95358225069615],
			[-91.77421295084059 , 37.95358231678823],
			[-91.77421320229769 , 37.95356361272628],
			[-91.77426709793507 , 37.95356328226578]
			];
	var type = "Polygon";
	
	var id = "Stairs_1";
	
	var prop = "hall";
	var level = "0";
	
	data.features[data.features.length] = innerArea(coordinates,type,id,prop,level);
	return data;
}


var indoorLayer = new L.Indoor(building(),{
	getLevel: function(feature){
		return feature.properties.level;
	},
	onEachFeature: function(feature, layer){
		layer.bindPopup("KOKOK");
		//layer.on('click',console.log("I've been clicked"));
	},
	style: function(feature){
		var fill = 'white';
		return{
			fillColor: fill,
			weight: 1,
			color:'#666',
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
/*
var room = L.polygon([
			[37.95358938864081 , -91.77426718175411],
			[37.95358919036457 , -91.77421445958316],
			[37.95358225069615 , -91.77421462722123],
			[37.95358231678823 , -91.77421295084059],
			[37.95356361272628 , -91.77421320229769],
			[37.953563282265776 , -91.77426709793507]
		     ]
		    ).bindPopup("I am a polygon.").addTo(map);
*/

var room = {
		"type": "Feature",
		 "properties": {
		 	"name": "test"
		 },
		 "geometry": {
		 	"type": "Polygon",
		 	"coordinates": [[
				 	[37.95358938864081 , -91.77426718175411],
					[37.95358919036457 , -91.77421445958316],
					[37.95358225069615 , -91.77421462722123],
					[37.95358231678823 , -91.77421295084059],
					[37.95356361272628 , -91.77421320229769],
					[37.953563282265776 , -91.77426709793507]
				       ]]
		 }
};
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup("HI");
    }
}
L.geoJson(room,{
	onEachFeature: onEachFeature
	}).addTo(map);


var temp = 'css/images/temp.PNG', imageBounds = [[37.953699, -91.77432], [37.953398, -91.77390]]; // Math Building G

var temp_1 = L.imageOverlay(temp, imageBounds);

temp_1.addTo(map);

temp_1.setOpacity(.0);

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
