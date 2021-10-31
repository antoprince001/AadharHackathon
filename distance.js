var geo = require('node-geo-distance');
 
// White house
var coord1 = {
  latitude: 38.8977330,
  longitude: -77.0365310
}
 
// Washington Monument
var coord2 = {
  latitude: 38.8894840,
  longitude: -77.0352790
}
 
geo.vincenty(coord1, coord2, function(dist) {
  console.log(dist);
});
 
var vincentyDist = geo.vincentySync(coord1, coord2);
 
 
 
geo.haversine(coord1, coord2, function(dist) {
  console.log(dist);
});
 
var haversineDist = geo.haversineSync(coord1, coord2);