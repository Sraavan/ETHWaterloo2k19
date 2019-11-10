
var contract;
var contractAbi;
var greenAssetType = 'Tree';
var latitude = '0.0';
var longitude = '0.0';
var userAddress;


$('#camera--trigger').click(function () {
    getLocation();
    addGreenAsset();
})

var x = document.getElementById("demo");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    latitude = position.coords.latitude
    longitude = position.coords.longitude
    x.innerHTML = "Latitude: " + latitude + 
    "<br>Longitude: " + longitude; 
    
}
function addGreenAsset() {
    x.innerHTML = "Latitude: " + latitude +
        "<br>Longitude: " + longitude;
    App.addGreenAsset(latitude, longitude)

}
