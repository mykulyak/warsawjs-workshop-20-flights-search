import React, { Component } from 'react';
import PropTypes from 'prop-types';

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const DEFAULT_STATE = {
  from: 'WAW',
  to: 'ATL',
  departureDate: formatDate(new Date()),
  returnDate: formatDate(new Date()),
};

export default class SearchForm extends Component {
  static propTypes = {
    airports: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      country: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    })),
    initialValues: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      departureDate: PropTypes.string,
      returnDate: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      ...DEFAULT_STATE,
      ...props.initialValues
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { from, to, departureDate, returnDate } = this.state;
    onSubmit({ from, to, departureDate, returnDate });
  };

  handleFromChange = (event) => {
    this.setState({ from: event.target.value });
  };

  handleToChange = (event) => {
    this.setState({ to: event.target.value });
  };

  handleDepartureDateChange = (event) => {
    global.console.warn(event.target.value);
    this.setState({ departureDate: event.target.value });
  };

  handleReturnDateChange = (event) => {
    global.console.warn(event.target.value);
    this.setState({ returnDate: event.target.value } );
  };

  render() {
    const { airports } = this.props;
    const { from, to, departureDate, returnDate } = this.state;
    return (
      <form
        name="search"
        method="POST"
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
