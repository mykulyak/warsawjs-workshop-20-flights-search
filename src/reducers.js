import { combineReducers } from 'redux';

import * as actions from './actions';
import { formatDate } from './utils';

const AIRPORTS_INITIAL_STATE = {
  api: {
    isFetching: false,
    lastFetched: null,
    lastError: null,
  },
  items: []
};

const FLIGHTS_INITIAL_STATE = {
  api: {
    isFetching: false,
    lastFetched: null,
    lastError: null,
  },
  items: []
};

export function airportReducer(state, action) {
  switch (action.type) {
    case actions.READ_AIRPORT_LIST_START:
      {
        const api = state.api;
        return {
          ...state,
          api: {
            ...api,
            isFetching: true
          }
        };
      }
    case actions.READ_AIRPORT_LIST_END:
      {
        const api = state.api;
        return action.error ? {
          ...state,
          api: {
            ...api,
            isFetching: false,
            lastFetched: null,
            lastError: action.payload
          },
          items: []
        } : {
          ...state,
          api: {
            ...api,
            isFetching: false,
            lastFetched: new Date(),
            lastError: null
          },
          items: action.payload
        };
      }
    default:
      return state || AIRPORTS_INITIAL_STATE;
  }
}

export function flightReducer(state, action) {
  switch (action.type) {
    case actions.SEARCH_FLIGHT_START:
      {
        const api = state.api;
        return {
          ...state,
          api: {
            ...api,
            isFetching: true
          }
        };
      }
    case actions.SEARCH_FLIGHT_END:
      {
        const api = state.api;
        return action.error ? {
          ...state,
          api: {
            ...api,
            isFetching: false,
            lastFetched: null,
            lastError: action.payload
          },
          items: []
        } : {
          ...state,
          api: {
            ...api,
            isFetching: false,
            lastFetched: new Date(),
            lastError: null
          },
          items: action.payload
        };
      }
    case actions.RESET_FLIGHT_SEARCH:
      return FLIGHTS_INITIAL_STATE;
    default:
      return state || FLIGHTS_INITIAL_STATE;
  }
}

const INITIAL_FLIGHT_SEARCH_STATE = {
  from: 'WAW',
  to: 'ATL',
  departureDate: formatDate(new Date()),
  returnDate: formatDate(new Date()),
};

export function flightSearchReducer(state, action) {
  switch (action.type) {
    case actions.UPDATE_FLIGHT_SEARCH:
      return { ...state, ...action.payload };
    case actions.RESET_FLIGHT_QUERY:
      return { ...state, ...INITIAL_FLIGHT_SEARCH_STATE };
    default:
      return state || INITIAL_FLIGHT_SEARCH_STATE;
  }
}

const INITIAL_FLIGHT_FILTER_STATE = {
  priceFrom: null,
  priceTo: null,
};

function flightFilterReducer(state, action) {
  switch (action.type) {
    case actions.UPDATE_FLIGHT_FILTER:
      return { ...state, ...INITIAL_FLIGHT_FILTER_STATE };
    case actions.RESET_FLIGHT_FILTER:
      return { ...state, ...action.payload };
    default:
      return state || INITIAL_FLIGHT_FILTER_STATE;
  }
}

export default combineReducers({
  airports: airportReducer,
  flights: flightReducer,
  flightQuery: flightSearchReducer,
  flightFilter: flightFilterReducer,
});
