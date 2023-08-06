const countries = ["ec"]; // List of countries to limit search to

let selectedPlaces = {
  origin: null,
  destination: null,
};

const rideBase = {
  baseFare: 1.4, // Base fare
  costPerMinute: 0.2, // Cost per minute
  costPerMile: 1.25, // Cost per mile
  baseDistance: 0.4, // Base distance in miles
};

const rideTypes = {
  uberx: {
    name: "UberX",
    description: "The low-cost Uber",
    capacity: 4,
    multiplier: 1,
  },
  uberxl: {
    name: "UberXL",
    description: "The low-cost Uber for groups",
    capacity: 6,
    multiplier: 1.1,
  },
  uberblack: {
    name: "Uber Black",
    description: "The original Uber",
    capacity: 4,
    multiplier: 1.2,
  },
  ubercomfort: {
    name: "Uber Comfort",
    description: "The Uber with extra legroom",
    capacity: 4,
    multiplier: 1.3,
  },
  /* uberselect: {
    name: "Uber Select",
    description: "The premium Uber",
    capacity: 4,
    multiplier: 1.4,
  },
  uberassist: {
    name: "Uber Assist",
    description: "The Uber with extra assistance",
    capacity: 4,
    multiplier: 1.5,
  }, */
};
