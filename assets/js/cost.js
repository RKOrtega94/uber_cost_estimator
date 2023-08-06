function getCost(rideTime, rideDistance, costPerMinute, constPerMile) {
  console.log(rideTime);
  console.log(rideDistance);
  console.log(costPerMinute);
  console.log(constPerMile);
  if (rideDistance > rideBase.baseDistance) {
    return (
      rideBase.baseFare + rideTime * costPerMinute + rideDistance * constPerMile
    );
  } else {
    return rideBase.baseFare + rideTime * costPerMinute;
  }
}

/* Loading simulate */
function loadingSimulate() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
}

function costEstimate(distance, time) {
  const informationContainer = document.getElementById("information-container");

  /* Clear information container */
  informationContainer.innerHTML = "";

  /* Distance / Time container */
  const distanceTimeContainer = document.createElement("div");
  distanceTimeContainer.classList.add("distance-time-container");

  /* Distance container */
  const distanceContainer = document.createElement("div");
  distanceContainer.classList.add("distance-container");

  /* Distance title */
  const distanceTitle = document.createElement("h3");
  distanceTitle.classList.add("distance-title");
  distanceTitle.innerText = "Distancia";

  /* Distance value */
  const distanceValue = document.createElement("p");
  distanceValue.classList.add("distance-value");
  distanceValue.innerText = distance;

  /* Time container */
  const timeContainer = document.createElement("div");
  timeContainer.classList.add("time-container");

  /* Time title */
  const timeTitle = document.createElement("h3");
  timeTitle.classList.add("time-title");
  timeTitle.innerText = "Tiempo";

  /* Time value */
  const timeValue = document.createElement("p");
  timeValue.classList.add("time-value");
  timeValue.innerText = time;

  /* Append distance / time container */
  distanceContainer.appendChild(distanceTitle);
  distanceContainer.appendChild(distanceValue);

  timeContainer.appendChild(timeTitle);
  timeContainer.appendChild(timeValue);

  distanceTimeContainer.appendChild(distanceContainer);
  distanceTimeContainer.appendChild(timeContainer);

  informationContainer.appendChild(distanceTimeContainer);

  /* Get costs from map rideType Json */
  for (const key in rideTypes) {
    if (rideTypes.hasOwnProperty(key)) {
      console.log(rideTypes[key]);
      const rideType = rideTypes[key];

      console.log(distance);
      console.log(time);

      const cost = getCost(
        timeToMinutes(time),
        kmToMiles(distance),
        rideBase.costPerMinute * rideType.multiplier,
        rideBase.costPerMile * rideType.multiplier
      );

      let rideContainer = document.createElement("div");
      rideContainer.classList.add("ride-container");

      let rideName = document.createElement("h3");
      rideName.classList.add("ride-name");
      rideName.innerText = rideType.name;

      let rideDescription = document.createElement("p");
      rideDescription.classList.add("ride-description");
      rideDescription.innerText = rideType.description;

      let rideCapacity = document.createElement("p");
      rideCapacity.classList.add("ride-capacity");
      rideCapacity.innerText = "Capacidad: " + rideType.capacity;

      let rideCost = document.createElement("p");
      rideCost.classList.add("ride-cost");
      rideCost.innerText = "$" + cost.toFixed(2);

      rideContainer.appendChild(rideName);
      rideContainer.appendChild(rideDescription);
      rideContainer.appendChild(rideCapacity);
      rideContainer.appendChild(rideCost);

      informationContainer.appendChild(rideContainer);
    }
  }
}

function timeToMinutes(time) {
  let hours = 0;
  let minutes = 0;

  if (time.includes("h")) {
    hours = time.split("h")[0];
    minutes = time.split("h")[1].split(" ")[1].split("m")[0];
  } else {
    minutes = time.split("min")[0];
  }

  console.log(parseInt(hours) * 60 + parseInt(minutes) + " minutes");

  return parseInt(hours) * 60 + parseInt(minutes);
}

function kmToMiles(km) {
  const kmValue = parseFloat(km.split(" ")[0]);
  return kmValue * 0.621371;
}
