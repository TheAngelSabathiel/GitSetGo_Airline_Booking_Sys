module.exports.computeMultiplierDueToDate = (departureTime) => {
  const departureDate = new Date(departureTime);
  const today = new Date();

  const daysUntilDeparture = (departureDate - today) / (1000 * 60 * 60 * 24);

  let multiplier;
  switch (true) {
    case daysUntilDeparture > 60:
      multiplier = 0.70;
      break;
    case daysUntilDeparture > 20:
      multiplier = 1.0;
      break;
    case daysUntilDeparture > 6:
      multiplier = 1.25;
      break;
    case daysUntilDeparture > 2:
      multiplier = 1.5;
      break;
    default:
      multiplier = 1.8;
  }

  const dayOfWeek = departureDate.getDay();
  const isWeekend = (dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6);

  if (isWeekend) {
    multiplier *= 1.15;
  }

  return Number(multiplier.toFixed(2));
}

module.exports.computeMultiplierDueToDemand = (capacityEconomy, capacityBusiness, availableEconomy, availableBusiness) => {
  // off-peak 80%
  // normal 100%
  // moderate 125%
  // high or near full 150%

  const demand = 1 - ((availableEconomy + availableBusiness) / (capacityEconomy + capacityBusiness));
  
  switch (true) {
    case demand <= 0.25:
      return 0.8;
    case demand <= 0.5:
      return 1;
    case demand <= 0.75:
      return 1.25;
    default:
      return 1.5;
  }
}


// Use to compute distance through Haversine formula
module.exports.computeDistance = (departureCoordinates, arrivalCoordinates) => {
  const R = 6371; // Earth's radius in kilometers

  const [lat1 , lon1] = departureCoordinates;
  const [lat2 , lon2] = arrivalCoordinates;

  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in km

  return Number(distance.toFixed(2));
};


// Use to compute for travel time 
module.exports.computeTravelTime = (departureTime, arrivalTime) => {
  const departure = new Date(departureTime);
  const arrival = new Date(arrivalTime);

  return (arrival - departure) / (1000 * 60 * 60);
}

// Use to show flight price estimate and for per-passenger-price calculation minus ancillary services fees and discounts upon booking
module.exports.computeFlightPrice = (price, distance, travelTime, fareClass, multiplierDueToDate, multiplierDueToDemand) => {
  // price is an object coming from aircraft schema referenced in the schedule schema
  // input distance computed using the function computeDistance
  // input travelTime computed using computeTravelTime
  // fareClass is the fareClass classification. Input seatId.fareclass if function is used in handling booking documents or auto Economy if used in estimating flight prices upon handling schedule documents. Handle change in prices due to fareClass in the frontend if not creating a booking.
  // Since our schemas work through {runValidators : true}  no need to put validation codes
  const flightPrice = (price.baseFee + distance * price.distanceRate + travelTime * price.operationalRate) * (fareClass === "Economy" ? 1 : 1.5) * multiplierDueToDate * multiplierDueToDemand;

  return Math.round(flightPrice);
}


// Use to compute subtotal prices per passenger including fare fees, discounts, and ancillary
module.exports.computeSubtotal = (flightPrice, promoDiscount, addOns) => {
  // addOns is an array of ancillaryServices documents with corresponding quantities ordered

  const sumAncillaryServices.reduce((acc, addOn) => {
    return acc + addOn.ancillarServiceId.price * addOn.quantity;
  }, 0);

  return flightPrice * (1 - promoDiscount/100) + sumAncillaryServices;
}

