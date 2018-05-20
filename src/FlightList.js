import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './FlightList.css';

function aggregate(path) {
  return path.reduce((memo, item, index, arr) => {
    const { airportFrom, airportTo, length } = item;
    memo.duration += length;
    if (index === 0 && arr.length > 1) {
      memo.airports.push(airportFrom);
    }
    memo.airports.push(airportTo);
    return memo;
  }, {
    duration: 0,
    airports: [],
  });
}

export default class FlightList extends Component {
  static propTypes = {
    flights: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      inboundAirport: PropTypes.string.isRequired,
      inboundDate: PropTypes.string.isRequired,
      inboundPath: PropTypes.arrayOf(PropTypes.shape({
        airline: PropTypes.number.isRequired,
        airportFrom: PropTypes.string.isRequired,
        airportTo: PropTypes.string.isRequired,
        length: PropTypes.number.isRequired,
        startHour: PropTypes.number.isRequired,
      })).isRequired,
      outboundAirport: PropTypes.string.isRequired,
      outboundDate: PropTypes.string.isRequired,
      outboundPath: PropTypes.arrayOf(PropTypes.shape({
        airline: PropTypes.number.isRequired,
        airportFrom: PropTypes.string.isRequired,
        airportTo: PropTypes.string.isRequired,
        length: PropTypes.number.isRequired,
        startHour: PropTypes.number.isRequired,
      })).isRequired,
      price: PropTypes.number.isRequired,
    })).isRequired,
    onReset: PropTypes.func.isRequired,
  };

  state = {
    priceFrom: '',
    priceTo: '',
    flights: this.props.flights,
  };

  componentWillReceiveProps({ flights }) {
    this.setState({
      flights: this.filterFlights(flights)
    });
  }

  filterFlights(flights) {
    let { priceFrom, priceTo } = this.state;
    const validFrom = priceFrom === String(Number(priceFrom));
    const validTo = priceTo === String(Number(priceTo));
    if (validFrom && validTo) {
      return flights.filter(({ price }) => price >= priceFrom && price <= priceTo);
    } else if (validFrom) {
      return flights.filter(({ price }) => price >= priceFrom);
    } else if (validTo) {
      return flights.filter(({ price }) => price <= priceTo);
    } else {
      return flights;
    }
  }

  handleChangePriceFrom = (event) => {
    this.setState({ priceFrom: event.target.value });
  };

  handleChangePriceTo = (event) => {
    this.setState({ priceTo: event.target.value });
  };

  handleFilterFlights = (event) => {
    this.setState({
      flights: this.filterFlights(this.props.flights)
    });
  };

  render() {
    const { onReset } = this.props;
    const { flights, priceFrom, priceTo } = this.state;
    return (
      <div className="flightList">
        <div>
          <form>
            <label>
              Min price:
              <input
                type="number"
                value={priceFrom}
                onChange={this.handleChangePriceFrom}
                onBlur={this.handleFilterFlights}
              />
            </label>
            <label>
              Max price:
              <input
                type="number"
                value={priceTo}
                onChange={this.handleChangePriceTo}
                onBlur={this.handleFilterFlights}
              />
            </label>
          </form>
          <button type="button" onClick={onReset}>Back to search</button>
        </div>
        <ul>
          {flights.map(flight => {
            const { price } = flight;
            const { duration, airports } = aggregate(flight.inboundPath);
            return (
              <li key={String(flight.id)} className="flight">
                <div>Price: ${price.toFixed(0)}</div>
                <div>Duration: {duration.toFixed(0)}h</div>
                {airports.length > 1 ? (
                  <div>Via: {airports.slice(1, -1).join(', ')}</div>
                ) : (
                  <div>Direct</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
