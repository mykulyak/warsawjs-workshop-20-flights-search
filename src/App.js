import React, { PureComponent } from 'react';

import { readAirportList, searchFlight } from './api';
import SearchForm from './SearchForm';
import FlightList from './FlightList';
import logo from './logo.svg';
import './App.css';

class App extends PureComponent {
  state = {
    isLoading: true,
    airports: null,
    searchParams: null,
    flights: null,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    readAirportList()
      .then((airports) => {
        this.setState({
          airports,
          isLoading: false
        });
      })
      .catch((error) => {
        global.console.warn(error);
        this.setState({ isLoading: false });
      });
  }

  handleSubmit = (searchParams) => {
    this.setState({ isLoading: true });
    searchFlight(searchParams)
      .then((flights) => {
        this.setState({
          isLoading: false,
          searchParams,
          flights
        });
      })
      .catch((error) => {
        global.console.warn(error);
        this.setState({ isLoading: false });
      });
  };

  handleReset = () => {
    this.setState({
      searchParams: {
        from: null,
        to: null,
        departureDate: null,
        returnDate: null,
      },
      flights: null,
    });
  };

  render() {
    const { isLoading, airports, searchParams, flights } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Flight Search</h1>
        </header>
        <div className="App-body">
          {isLoading && (
            <span>Loading ...</span>
          )}
          {!isLoading && !flights && (
            <SearchForm
              airports={airports}
              initialValues={searchParams}
              onSubmit={this.handleSubmit}
              onReset={this.handleReset}
            />
          )}
          {!isLoading && flights && (
            <FlightList
              flights={flights}
              onReset={this.handleReset}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
