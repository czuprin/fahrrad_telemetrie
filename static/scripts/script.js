mapboxgl.accessToken = 'pk.eyJ1IjoiY2xlbWVuc2N6dXByaW4iLCJhIjoiY2w4bjhkMzRuMHg4czNvc2Q4bHNjcG14NSJ9.r0vDmoUOPZiNA4ikhTOQPQ';
var coordinates = []
var map = ""


const userAction = async () => {
    const response = await fetch('/data');
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
    coordinates = myJson['data'];

     

    

    console.log(coordinates);



map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v11',
  //style: 'mapbox://styles/mapbox/streets-v12'
  center: [7.0836962, 49.9433667],
  zoom: 8
});



var geojson = {
  'type': 'FeatureCollection',
  'features': [{
    'type': 'Feature',
    'properties': {
      'name': 'Route',
      'color': '#ffffff'
    },
    'geometry': {
      'type': 'LineString',
      'coordinates': coordinates
    }
  }]
};

map.on('load', function() {
  map.addSource('route', {
    'type': 'geojson',
    'data': geojson
  });

  map.addLayer({
    'id': 'route',
    'type': 'line',
    'source': 'route',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': ['get', 'color'],
      'line-width': 5
    }
  });


});

const coordinates2 = geojson.features[0].geometry.coordinates;
 
// Create a 'LngLatBounds' with both corners at the first coordinate.
const bounds2 = new mapboxgl.LngLatBounds(
coordinates2[0],
coordinates2[0]
);
 
// Extend the 'LngLatBounds' to include every coordinate in the bounds result.
// Extend the 'LngLatBounds' to include every coordinate in the bounds result.
for (const coord of coordinates2) {
  bounds2.extend(coord);
  }
 
map.fitBounds(bounds2, {
padding: 20, duration: 0
});

}




function zoom(){
  

  var bounds = [[6.5254632070959973, 48.85109029479264], [ 8.781604026118787, 50.30348197290076]];

// set the bounds of the map
map.fitBounds(bounds, {
  
  //duration: 7000
  duration: 3000
});
}


userAction();

setTimeout( function() {  zoom(); }, 3000);
 




