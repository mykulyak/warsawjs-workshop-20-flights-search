
export function isLoadingAirportList(state) {
  return !!state.airports.isFetching;
}

export function shouldShowFlights(state) {
  const api = state.flights.api;
  return !api.isFetching && !api.lastError && !!api.lastFetched;
}

export function getAirportList(state) {
  return state.airports.items;
}

export function getFlightQuery(state) {
  return state.flightQuery;
}

export function getFlightFilter(state) {
  return state.flightFilter;
}

export function getFlightList(state) {
  return state.flights.items;
}
