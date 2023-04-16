mapboxgl.accessToken = 'pk.eyJ1IjoiY2xlbWVuc2N6dXByaW4iLCJhIjoiY2w4bjhkMzRuMHg4czNvc2Q4bHNjcG14NSJ9.r0vDmoUOPZiNA4ikhTOQPQ';
var coordinates = []


const userAction = async () => {
    const response = await fetch('http://127.0.0.1:4323/data');
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
    coordinates = myJson['data'];

     

    

    console.log(coordinates);



var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [8.0836962, 49.9433667],
  zoom: 14
});

var geojson = {
  'type': 'FeatureCollection',
  'features': [{
    'type': 'Feature',
    'properties': {
      'name': 'Route',
      'color': '#ff0000'
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

}
userAction();
