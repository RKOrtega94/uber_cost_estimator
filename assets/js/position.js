/**
 * @file position.js
 *
 * This file contains the functions to get the user's position.
 *
 * @function showPosition - Shows the user's position.
 * @function showError - Shows an error message if the user's position cannot be found.
 *
 * @function getLocation - Gets the user's position.
 */
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  new Mapkick.Map("map", [{ latitude: latitude, longitude: longitude }]);
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

$(document).ready(function () {
  getLocation();
});
