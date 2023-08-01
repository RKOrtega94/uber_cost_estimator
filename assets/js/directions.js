mapboxgl.accessToken =
  "pk.eyJ1IjoicmtvcnRlZ2EiLCJhIjoiY2wyMjdyMjhsMTdmNDNlbWk1N3QyNWkxZiJ9.9K-6bLBv-30hObNDFI7tow";
/**
 * Build the directions for the user to follow.
 *
 * @function buildDirections
 */
function buildDirections() {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11", // You can use other Mapbox styles if needed
    center: [originPoint.longitude, originPoint.latitude], // Set the initial map center coordinates
    zoom: 12, // Set the initial zoom level
  });

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    units: "metric",
    profile: "mapbox/driving",
    controls: {
      inputs: true,
      instructions: true,
    },
  });

  map.addControl(directions, "top-left");
}
