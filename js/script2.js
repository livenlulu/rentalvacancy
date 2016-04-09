var layer = L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',{
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

var map = L.map('myMap').setView( [40.738153,-73.913612], 12);
map.addLayer(layer);

var rentData = [];
    

var chart;

var manhattan = [40.763121,-73.948288];
var brooklyn = [40.637925,-73.948288];
var bronx = [40.841606, -73.874817];
var queens = [40.716298,-73.853874];
var statenisland = [40.571719,-74.148788];

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
    updateChart(data.features.feature.properties)
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
    $('#side').html('<h3>' + '% Vacant Units for Rent' + '</h3>' + '<h4>' + layer.feature.properties.VALUE2 + '</h4>');
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

$.getJSON('data/subwaystop.geojson', function(data2) {
  // console.log(data);

var subwaystations = {
    radius: 2,
    fillColor: "green",
    color: "#fff",
    weight: .5,
    opacity: 1,
    fillOpacity: 01,
    
};

L.geoJson(data2, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, subwaystations);
    }
}).addTo(map);
});




nv.addGraph(function() {
  var chart = nv.models.discreteBarChart()
    .x(function(d) { return d.label })
    .y(function(d) { return d.value })
    .staggerLabels(true)
    .showValues(true);

  d3.select('#chart svg')
    .datum(rentData)
    .transition().duration(500)
    .call(chart)
    ;


  nv.utils.windowResize(chart.update);

  return chart;
});




//Each bar represents a single discrete quantity.
function updateChart(f){

  rentData.key = "vacancyrent";
  rentData.values =
    [
        { 
          "label" : "A Label" ,
          "value" : f.medinc
        } , 
        { 
          "label" : "B Label" , 
          "value" : f.medrent_VALUE2
        } , 
        { 
          "label" : "C Label" , 
          "value" : f.medrent_VALUE2
        } , 
        { 
          "label" : "D Label" , 
          "value" : f.medinc
        } 
      ]
  
}
