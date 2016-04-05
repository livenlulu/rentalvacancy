var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

var map = L.map('myMap').setView( [40.736913,-73.987513], 12);
map.addLayer(layer);


$.getJSON('data/subwaystop.geojson', function(data) {
  // console.log(data);

var subwaystations = {
    radius: 2,
    fillColor: "blue",
    color: "#fff",
    weight: .5,
    opacity: 1,
    fillOpacity: 01
};


L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, subwaystations);
    }
}).addTo(map);
});


var manhattan = [40.748818,-73.874817];
var brooklyn = [40.637925,-73.948288];
var bronx = [40.841606, -73.874817];
var queens = [40.701464,-73.788300];
var statenisland = [40.576413,-74.104156];

var panOptions = {
    animate: true,
    duration: 2
 	}

      $(".myButton").click(function() {
      if($(this).attr('id') == 'one' ) {
        map.panTo(manhattan, panOptions);
      } 
      
      else if 
      ($(this).attr('id') == 'two' ) {
        $(this).css('background-color','#fff');
        map.panTo(brooklyn, panOptions);
      } 

      else if 
      ($(this).attr('id') == 'three' ) {
        $(this).css('background-color','#fff');
        map.panTo(bronx, panOptions);
      } 

      else if 
      ($(this).attr('id') == 'four' ) {
        $(this).css('background-color','#fff');
        map.panTo(queens, panOptions);
      } 

      else {
        $(this).css('background-color','#fff');
        map.panTo(statenisland, panOptions);
      }
    });
// function onEachFeature(feature, layer) {
//     // does this feature have a property named popupContent?
//     if (feature.properties && feature.properties.popupContent) {
//         layer.bindPopup(feature.properties.popupContent);
//     }
// }

  var geojson;

  $.getJSON('data/vac.geojson', function(data) {
    geojson = L.geoJson(data, {
    	style: style,
    	onEachFeature: onEachFeature
    }).addTo(map);
  });


  function getColor(d) {
    return d > 90 ? '#0000cc' :
           d > 80  ? '#BD0026' :
           d > 60  ? '#E31A1C' :
           d > 50  ? '#FC4E2A' :
           d > 40  ? '#FD8D3C' :
           d > 30  ? '#FEB24C' :
           d > 20  ? '#FED976' :
                     '#FFEDA0' ;
  }


  function style(feature) {
    return {
        fillColor: getColor(feature.properties.VALUE2),
        weight: .2,
        opacity: 1,
        color: 'white',
        dashArray: '0',
        fillOpacity: 0.7
    };
  }

  function mouseoverFunction(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        opacity: 1,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    // console.log(layer.feature.properties.VALUE2);
    $('#infoWindow').html('<h3>' + '% Vacant Units for Rent' + '</h3>' + '<h4>' + layer.feature.properties.VALUE2 + '</h4>');
  	}

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: mouseoverFunction,
        mouseout: resetHighlight
        //click: zoomToFeature
    });
  }