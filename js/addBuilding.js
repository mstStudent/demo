// End of temp blocks
/*

// Rough Lat/Lngs for Math Building, not sure if we need it but it's here.

[
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

]
        
*/

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
	

	Rolla_Building_Floor_4.forEach(function(room){
						    //innerArea(coordinates,type,id,prop,level);
		room[1].forEach(function(latLng,index){
		 if(latLng[0] > 0){
		  var temp = latLng[0];
		  latLng[0] = latLng[1];
		  latLng[1] = temp;
		  room[1][index] = latLng;
		 }
		});
		data.features[data.features.length] = innerArea(room[1],"Polygon",room[0],room[2],room[3]);
	});
	return data;
}


var indoorLayer = new L.Indoor(building(),{
	getLevel: function(feature){
		return feature.properties.level;
	},
	onEachFeature: function(feature, layer){
		layer.bindPopup(feature.id);
		//layer.on('click',console.log("I've been clicked"));
	},
	style: function(feature){
		var fill = 'white';
		if(feature.properties.buildingpart == 'Wall'){
		  fill = 'grey';
		}else if (feature.properties.buildingpart == 'Hall'){
		  fill = 'lightblue';
		}else if (feature.properties.buildingpart == 'Class_Room'){
		  fill = 'lightgreen';
		}
		
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
