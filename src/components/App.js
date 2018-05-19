import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';

import { readAirportList } from '../actions';
import * as selectors from '../selectors';
import logo from '../logo.svg';
import SearchForm from './SearchForm';
import FlightList from './FlightList';
import './App.css';

class App extends PureComponent {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    showFlights: PropTypes.bool.isRequired,
    store: PropTypes.object.isRequired,
    readAirportList: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.readAirportList();
  }

  render() {
    const { isLoading, showFlights, store } = this.props;
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Flight Search</h1>
          </header>
          <div className="App-body">
            {isLoading && (
              <span>Loading ...</span>
            )}
            {!isLoading && !showFlights && (
              <SearchForm />
            )}
            {!isLoading && showFlights && (
              <FlightList />
            )}
          </div>
        </div>
      </Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: selectors.isLoadingAirportList(state),
    showFlights: selectors.shouldShowFlights(state),
  };
}

export default connect(mapStateToProps, { readAirportList })(App);
