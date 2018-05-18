const ROOT_URL = 'https://warsawjs-flights-api.herokuapp.com';

export function readAirportList() {
  return global.fetch(`${ROOT_URL}/airports`)
    .then(response => response.json());
}

export function searchFlight(params) {
  const { departureDate, returnDate, from, to } = params;
  return global.fetch(`${ROOT_URL}/flights/${departureDate}/${returnDate}/${from}/${to}`)
    .then(response => response.json());
}
