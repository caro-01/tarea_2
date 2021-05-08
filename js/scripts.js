// Mapa Leaflet
var mapa = L.map('mapid').setView([9.93, -84.181], 13);

// Definición de capas base
var capa_osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
  {
    maxZoom: 20,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(mapa);	

// Otra capa base
	var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }).addTo(mapa);

// Otra capa base
    var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
    }).addTo(mapa);
	
// Otra capa base
    var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	}
	).addTo(mapa);	
	

// Conjunto de capas base
var capas_base = {
  "OpenTopoMap":OpenTopoMap,
  "Stamen_Terrain": Stamen_Terrain,
  "ESRI": esri,
  "OSM": capa_osm,
};	    
	    
// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	

// Control de escala
L.control.scale({position: "topright", imperial: false}).addTo(mapa);

// Capa vectorial de localizaciones de Santa Ana en formato GeoJSON
$.getJSON("https://caro-01.github.io/tarea_2/capas/localidades/localidades.geojson", function(geodata) {
  var capa_loc = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#EDF71A", 'weight': 8, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Código</strong>: " + feature.properties.name + "<br>" + "<strong>Distrito</strong>: " + feature.properties.distrito;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_loc, 'Localidades');
});	

// Capa vectorial de la red vial de Santa Ana en formato GeoJSON
$.getJSON("https://caro-01.github.io/tarea_2/capas/red_vial/red_vial.geojson", function(geodata) {
  var capa_vias = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#000000", 'weight': 1, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Código</strong>: " + feature.properties.id + "<br>" + "<strong>Nomenclatura</strong>: " + feature.properties.nomenclatu;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_vias, 'Red vial');
});	

// Capa vectorial de predios de Santa Ana en formato GeoJSON
$.getJSON("https://caro-01.github.io/tarea_2/capas/predial/predial.geojson", function(geodata) {
  var capa_pr = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#F08301", 'weight': 2, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>GIS</strong>: " + feature.properties.ngis + "<br>" + "<strong>Área m2</strong>: " + feature.properties.area1;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_pr, 'Predial');
});	

  // Capa vectorial de distritos de Santa Ana en formato GeoJSON
$.getJSON("https://caro-01.github.io/tarea_2/capas/distritos/distritos.geojson", function(geodata) {
  var capa_distritos = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#896836", 'weight': 3, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Codigo</strong>: " + feature.properties.nodistrito + "<br>" + "<strong>Distrito</strong>: " + feature.properties.distrito;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_distritos, 'Distritos');
});	

