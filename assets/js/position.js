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

let originPoint;
let destination;

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

  originPoint = new PointMap(latitude, longitude);

  destination = new PointMap(-0.14474, -78.43287);

  buildDirections();
}

function showError(error) {
  console.log(error);
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
