import React, { Component } from "react";
import Grid from 'material-ui/Grid';
import "./App.css";
import Header from "./Header";
import Map from "./Map.js";
import Search from "./Search.js";
import { searchForPub, getDetails } from "./pubSearch";
import SearchList from "./searchList";
import LocationInfo from './LocationInfo'
import { GOOGLE_PLACES_API_KEY } from './config';

const pubSearch = searchForPub(GOOGLE_PLACES_API_KEY);

class App extends Component {
  state = {
    pubs: [],
    relatedPubs: [],
    activeLocation: null,
    locationInfo: null,
    mapCenter: {
      lat: 51.5401,
      lng: -0.1426
    },
  };

  componentDidMount() {
    this.handleSearchQuery(this.props.defaultQuery);
  }

  handleSearchQuery = query => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      pubSearch(query).then(pubs => this.setState({ pubs }));
    }, 500);
  };

  onSearch = event => {
    const value = event.target.value;
    this.handleSearchQuery(value);
  };

  setActiveLocation = location => {
    this.setState({
      activeLocation: location,
    })
  };

  getLocationDetails = location => {
    const { lat, lng } = location;
    getDetails(`${lat},${lng}`).then(response => {
      this.setState({
        locationInfo: response && response.response
      });
    });
  };

  centerMap = location => {
    this.setState({
      mapCenter: location.geometry.location,
    })
  };

  handleSearchResultClick = result => {
    this.setActiveLocation(result);
    this.centerMap(result);
    this.getLocationDetails(result.geometry.location)
  };

  render() {
    return (
      <div>
        <Header />
        <Map
          center={this.state.mapCenter}
          pubs={this.state.pubs}
          onPubClick={this.getLocationDetails}
        />
        <main>
          <Search onChange={this.onSearch} />
          <SearchList pubs={this.state.pubs} onItemClick={this.handleSearchResultClick} />
          { this.state.activeLocation && <LocationInfo {...this.state.activeLocation} /> }
          <div>
            <Grid container spacing={16} justify="center">
              {this.state.locationInfo &&
              this.state.locationInfo.venues.map(venue => <Grid item><LocationInfo name={venue.name} /></Grid>)}
            </Grid>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
