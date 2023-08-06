class Position {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          // Center the map on the user's location
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(userLocation);

          // Set the origin to the user's location
          selectedPlaces.origin = userLocation;
        },
        function () {
          console.log("Geolocation failed.");
        }
      );
    } else {
      console.log("Geolocation not supported.");
    }
  }
}
