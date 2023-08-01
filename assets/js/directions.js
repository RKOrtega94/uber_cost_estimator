mapboxgl.accessToken =
  "pk.eyJ1IjoicmtvcnRlZ2EiLCJhIjoiY2wyMjdyMjhsMTdmNDNlbWk1N3QyNWkxZiJ9.9K-6bLBv-30hObNDFI7tow";
/**
 * Build the directions for the user to follow.
 *
 * @function buildDirections
 */
function buildDirections() {
  // Initialize the map
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11", // You can use other Mapbox styles if needed
    center: [originPoint.longitude, originPoint.latitude], // Set the initial map center coordinates
    zoom: 12, // Set the initial zoom level
  });

  // Add directions control to the map
  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: "metric", // Use 'imperial' for non-metric units
    profile: "mapbox/driving", // You can use 'mapbox/walking', 'mapbox/cycling', etc.
    controls: {
      inputs: true,
    },
  });

  /*  document.getElementByClassName("mapbox-directions-profile").style.display =
    "none"; */
  $(".mapbox-directions-profile").hide();
  // Add the control to the map
  map.addControl(directions, "top-left");
}
