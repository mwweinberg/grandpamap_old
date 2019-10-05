mapboxgl.accessToken = 'pk.eyJ1IjoibXdlaW5iZXJnIiwiYSI6ImNqZ2I5azJtNTJlemYyd215ZTV3bXBmcWoifQ.Rd-1dcf3z9asEQqbu1MxOw';


//creates the map
var map = new mapboxgl.Map({
  container: 'map', // container element id
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-74.0059, 40.7128], // initial map center in [lon, lat]
  zoom: 2
});

//loads and parses the data
map.on('load', function() {
  map.addLayer({
    id: 'year',
    type: 'circle',
    source: {
      type: 'geojson',
      data: './grandpascan.geojson' // replace this with the url of your own geojson
    },
    paint: {
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['number', ['get', 'Pages']],
        0, 4,
        5, 24
      ],
      'circle-color': [
        'interpolate',
        ['linear'],
        ['number', ['get', 'Pages']],
        0, '#2DC4B2',
        1, '#3BB3C3',
        2, '#669EC4',
        3, '#8B88B6',
        4, '#A2719B',
        5, '#AA5E79'
      ],
      'circle-opacity': 0.8
  },
  filter: ['==', ['number', ['get', 'Year']], 1943]
    });

    document.getElementById('slider').addEventListener('input', function(e) {
        var year = parseInt(e.target.value);
        console.log(year)
        // update the map
        map.setFilter('year', ['==', ['number', ['get', 'Year']], year]);

          // update text in the UI
          //document.getElementById('active-hour').innerText = year;
    });


});




