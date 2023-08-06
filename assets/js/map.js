const position = new Position();

let map;
let directionsService;
let directionsRenderer;

let startMarker;
let endMarker;

function initMap() {
  const currentLocation = position.getCurrentPosition();

  // Create a new map centered on a default location
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: position.latitude, lng: position.longitude }, // Default location (San Francisco)
    zoom: 20,
    disableDefaultUI: true,
  });

  // Create the DirectionsService and DirectionsRenderer
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
  });

  console.clear();
}

$(document).ready(function () {
  const originInput = document.getElementById("start");
  const destinationInput = document.getElementById("destination");

  const originSearchBox = new google.maps.places.SearchBox(originInput, {
    // Restrict the search to the selected countries
    componentRestrictions: { country: countries },
  });

  const destinationSearchBox = new google.maps.places.SearchBox(
    destinationInput,
    {
      // Restrict the search to the selected countries
      componentRestrictions: { country: countries },
    }
  );

  // Bias the SearchBox results towards the current map's viewport
  map.addListener("bounds_changed", function () {
    originSearchBox.setBounds(map.getBounds());
    destinationSearchBox.setBounds(map.getBounds());
  });

  // Listen for the event when the user selects a prediction from the custom search box
  originSearchBox.addListener("places_changed", function () {
    const places = originSearchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    // Get the selected place's location
    const place = places[0];
    const newLocation = place.geometry.location;

    // Center the map on the selected place
    map.setCenter(newLocation);

    // Add to selectedPlaces
    selectedPlaces.origin = newLocation;

    // Build markers from selectedPlaces
    buildMarkersFromSelectedPlaces();
  });

  destinationSearchBox.addListener("places_changed", function () {
    const places = destinationSearchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    // Get the selected place's location
    const place = places[0];
    const newLocation = place.geometry.location;

    // Center the map on the selected place
    map.setCenter(newLocation);

    // Add to selectedPlaces
    selectedPlaces.destination = newLocation;

    // Build markers from selectedPlaces
    buildMarkersFromSelectedPlaces();
  });
});

function buildMarkersFromSelectedPlaces() {
  // Build the markers
  const startMarker = new google.maps.Marker({
    position: selectedPlaces.origin,
    map: map,
  });

  const endMarker = new google.maps.Marker({
    position: selectedPlaces.destination,
    map: map,
  });

  // Build the directions request
  const directionsRequest = {
    origin: selectedPlaces.origin,
    destination: selectedPlaces.destination,
    travelMode: "DRIVING",
  };

  // Get the directions
  directionsService.route(directionsRequest, function (response, status) {
    if (status === "OK") {
      const rideTime = response.routes[0].legs[0].duration.text;
      const rideDistance = response.routes[0].legs[0].distance.text;
      console.log(rideDistance);

      costEstimate(rideDistance, rideTime);

      directionsRenderer.setDirections(response);
    } else {
      window.alert("Directions request failed due to " + status);
    }
  });
}
