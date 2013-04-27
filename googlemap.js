/**
 * Created with JetBrains WebStorm.
 * User: Jonathan Wu
 * Date: 4/27/13
 * Time: 1:01 PM
 * To change this template use File | Settings | File Templates.
 */
var map;
var coords;
var geocoder;

function load(){
    navigator.geolocation.getCurrentPosition(c, e);
}
var c = function(pos){
    var lat = pos.coords.latitude;
    var long = pos.coords.longitude;
    acc = pos.coords.accuracy;
    coords = lat + ',' +long;
    initialize(lat, long);
}
var e = function(error){
    if(error.code ===1){
        alert('Unable to get location');
    }
}

function initialize(lat,long) {
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(lat, long),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(lat, long)
    });
}

function codeAddress(place) {
//    document.write(2 + "<br \>");
    var address = place;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

google.maps.event.addDomListener(window, 'load', load);