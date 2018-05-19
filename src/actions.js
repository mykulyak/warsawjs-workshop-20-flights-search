import * as api from './api';

export const READ_AIRPORT_LIST_START = 'READ_AIRPORT_LIST_START';
export const READ_AIRPORT_LIST_END = 'READ_AIRPORT_LIST_END';

function readAirportListStart() {
  return {
    type: READ_AIRPORT_LIST_START,
    payload: null,
  };
}

function readAirportListEnd(response) {
  const isError = response instanceof Error;
  return {
    type: READ_AIRPORT_LIST_END,
    payload: response,
    error: isError,
  };
}

export function readAirportList() {
  return (dispatch) => {
    dispatch(readAirportListStart());
    return api.readAirportList().then((response) => {
      return dispatch(readAirportListEnd(response));
    }).catch((error) => {
      return dispatch(readAirportListEnd(error));
    });
  };
}

export const SEARCH_FLIGHT_START = 'SEARCH_FLIGHT_START';
export const SEARCH_FLIGHT_END = 'SEARCH_FLIGHT_END';
export const RESET_FLIGHT_SEARCH = 'RESET_FLIGHT_SEARCH';

function searchFlightStart() {
  return {
    type: SEARCH_FLIGHT_START,
    payload: null
  };
}

function searchFlightEnd(response) {
  const isError = response instanceof Error;
  return {
    type: SEARCH_FLIGHT_END,
    payload: response,
    error: isError,
  };
}

export function searchFlight(params) {
  return (dispatch) => {
    dispatch(searchFlightStart());
    return api.searchFlight(params).then((response) => {
      return dispatch(searchFlightEnd(response));
    }).catch((error) => {
      return dispatch(searchFlightEnd(error));
    });
  };
}

export function resetFlightSearch() {
  return {
    type: RESET_FLIGHT_SEARCH,
    payload: null,
  };
}

export const UPDATE_FLIGHT_SEARCH = 'UPDATE_FLIGHT_SEARCH';
export const RESET_FLIGHT_QUERY = 'RESET_FLIGHT_QUERY';

export function updateFlightQuery(params) {
  return {
    type: UPDATE_FLIGHT_SEARCH,
    payload: params
  };
}

export function resetFlightQuery() {
  return {
    type: RESET_FLIGHT_QUERY,
    payload: null
  };
}

export const UPDATE_FLIGHT_FILTER = 'UPDATE_FLIGHT_FILTER';
export const RESET_FLIGHT_FILTER = 'RESET_FLIGHT_FILTER';

export function updateFlightFilter(params) {
  return {
    type: UPDATE_FLIGHT_FILTER,
    payload: params
  };
}

export function resetFlightFilter() {
  return {
    type: RESET_FLIGHT_FILTER,
    payload: null,
  };
}
