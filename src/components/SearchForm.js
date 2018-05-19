import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateFlightQuery, resetFlightQuery, searchFlight } from '../actions';
import * as selectors from '../selectors';
import './SearchForm.css';

class SearchForm extends Component {
  static propTypes = {
    airports: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    })),
    flightQuery: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      departureDate: PropTypes.string,
      returnDate: PropTypes.string,
    }),
    updateFlightQuery: PropTypes.func.isRequired,
    resetFlightQuery: PropTypes.func.isRequired,
    searchFlight: PropTypes.func.isRequired,
  };

  state = this.props.flightQuery;

  componentWillReceiveProps({ flightQuery }) {
    this.setState(flightQuery);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateFlightQuery(this.state);
    this.props.searchFlight(this.state);
  };

  handleFromChange = (event) => {
    this.setState({ from: event.target.value });
  };

  handleToChange = (event) => {
    this.setState({ to: event.target.value });
  };

  handleDepartureDateChange = (event) => {
    this.setState({ departureDate: event.target.value });
  };

  handleReturnDateChange = (event) => {
    this.setState({ returnDate: event.target.value } );
  };

  render() {
    const { airports } = this.props;
    const { from, to, departureDate, returnDate } = this.state;
    return (
      <form
        name="search"
        method="POST"
        className="SearchForm"
        onSubmit={this.handleSubmit}
        onReset={this.handleReset}
      >
        <label>From:
          <select
            name="from"
            value={from}
            onChange={this.handleFromChange}
          >
            {airports.map(({ id, code, country, city }) => (
              <option key={code} value={code}>{city} ({country})</option>
            ))}
          </select>
        </label>
        <label>To:
          <select
            name="to"
            value={to}
            onChange={this.handleToChange}
          >
            {airports.map(({ id, code, country, city }) => (
              <option key={code} value={code}>{city} ({country})</option>
            ))}
          </select>
        </label>
        <label>
          Departure:
          <input
            type="date"
            name="departure"
            value={departureDate}
            onChange={this.handleDepartureDateChange}
          />
        </label>
        <label>
          Return:
          <input
            type="date"
            name="return"
            value={returnDate}
            onChange={this.handleReturnDateChange}
          />
        </label>
        <div>
          <button type="submit">Search</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    airports: selectors.getAirportList(state),
    flightQuery: selectors.getFlightQuery(state),
  };
}

export default connect(mapStateToProps, {
  updateFlightQuery,
  resetFlightQuery,
  searchFlight,
})(SearchForm);
