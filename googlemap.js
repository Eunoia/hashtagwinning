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
function loadParks(){
    // http://rpc.geocoder.us/service/json?address=1600+Pennsylvania+Ave,+Washington+DC
    // 37.851543,-122.207708 sibly
    // 37.86801,-122.309332 kite
    var parks = [[37.851543,-122.207708],[37.86801,-122.309332]]
    for(var i =0 ;i<parks.length; i++){
       var marker = new google.maps.Marker({
           map: map,
           icon: 'http://placekitten.com/30/30',
           position: new google.maps.LatLng(parks[i][0],parks[i][1])
       });

    }
}
function generateInfo(data){
   text = '<div class="marker">';
   text += '<div class="title">'+ data.title+'</div>'
   text += '<img data-badge="go-fly-a-kite.png" class="checkInBtn" src="img/checkin-button.png">'
   text += '</div>'
   return text;
}
$(function(){
   $("body").on("click",".checkInBtn",function(){
       console.log($(this).data("badge"));
   })
})

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
        icon: 'me.svg',
        shadow: 'me.svg',
        width: '20px',
        position: new google.maps.LatLng(lat, long)
    });
   for(var i = 0; i < addresses.length; i++){
       codeAddress(addresses[i],lat,long);
   }
}

var timeout = .3

function codeAddress(place,lat,long) {
//    document.write(2 + "<br \>");
  var address = place.address;
  geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
//            map.setCenter(results[0].geometry.location);

          var infowindow = new google.maps.InfoWindow({
              content: generateInfo(place)
          });
//            alert(generateInfo(place));
          var icon = 'img/iron.png';
          if(place.sector == "Hotel"){
              icon = "img/hotel.png"
          }
          if(place.sector == "Dentist"){
              icon = "img/tooth.png";
          }
          if(place.sector == "Restaurant"){
              icon = "img/resturants.png";
          }

          var marker = new google.maps.Marker({
              icon: icon,
              map: map,
              position: results[0].geometry.location,
              title: place.title
          });
          google.maps.event.addListener(marker, 'click', function() {
              infowindow.open(map,marker);
          });

      } else {
          if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT)
          {
              setTimeout(function() { codeAddress(place,lat,long); }, (timeout * 3));
          }

//            alert("Geocode was not successful for the following reason: " + status);
      }
  });
}


google.maps.event.addDomListener(window, 'load', load);