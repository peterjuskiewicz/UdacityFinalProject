import React, { Component } from "react";
import { get } from "lodash";
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import "./App.css";
import Header from "./Header";
import Map from "./Map.js";
import Search from "./Search.js";
import { searchForPub, getDetails } from "./pubSearch";
import SearchList from "./searchList";
import LocationInfo from "./LocationInfo";
import { GOOGLE_PLACES_API_KEY } from "./config";

const pubSearch = searchForPub(GOOGLE_PLACES_API_KEY);

class App extends Component {
  state = {
    pubs: [],
    activeLocation: null,
    otherVenues: [],
    locationInfo: {
      description: ""
    },
    errorMessage: "",
    errorMessageForsquare: "",
    mapCenter: {
      lat: 51.5401,
      lng: -0.1426
    }
  };

  componentDidMount() {
    this.handleSearchQuery(this.props.defaultQuery);
  }

  handleSearchQuery = query => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      pubSearch(query)
        .then(pubs => {
          this.setState({ pubs, errorMessage: "" });
        })
        .catch(error => {
          this.setState({ pubs: [] });
          this.setState({ errorMessage: error });
        });
    }, 500);
  };

  onSearch = event => {
    const value = event.target.value;
    this.handleSearchQuery(value);
  };

  setActiveLocation = location => {
    this.setState({
      activeLocation: location
    });
  };

  getLocationDetails = (location, name) => {
    const { lat, lng } = location;
    getDetails(`${lat},${lng}`, name)
      .then(venue => {
        this.setState({
          locationInfo: venue,
          errorMessageForsquare: ""
        });
      })
      .catch(error => {
        this.setState({
          locationInfo: null,
          errorMessageForsquare: error
        });
      });
  };

  centerMap = location => {
    this.setState({
      mapCenter: location.geometry.location
    });
  };

  handleSearchResultClick = result => {
    this.setActiveLocation(result);
    this.centerMap(result);
    this.getLocationDetails(result.geometry.location, result.name);
  };

  render() {
    const { locationInfo } = this.state;

    return (
      <div>
        <Header />
        <Map
          center={this.state.mapCenter}
          activeLocation={this.state.activeLocation}
          pubs={this.state.pubs}
          onPubClick={this.getLocationDetails}
        />
        <main>
          <Search onChange={this.onSearch} />
          <SearchList
            pubs={this.state.pubs}
            onItemClick={this.handleSearchResultClick}
            errorMessage={this.state.errorMessage}
          />
          {this.state.activeLocation && (
            <LocationInfo
              {...this.state.activeLocation}
              description={get(locationInfo, "description")}
              price={get(locationInfo, "price.message")}
              formattedPhone={get(locationInfo, "contact.formattedPhone")}
              status={get(locationInfo, "hours.status")}
              photo={get(locationInfo, "bestPhoto")}
            />
          )}
          <Grid container spacing={32} justify="center">
            {this.state.errorMessageForsquare && (
              <Typography component="p">
                {this.state.errorMessageForsquare}
              </Typography>
            )}
          </Grid>
        </main>
      </div>
    );
  }
}

export default App;
