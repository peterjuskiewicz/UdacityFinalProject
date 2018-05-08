import React, { Component } from "react";
import "./App.css";
import Header from "./Header";
import Map from "./Map.js";
import Search from "./Search.js";
import { searchForPub, getDetails } from "./pubSearch";
import SearchList from "./searchList";

const KEY = "AIzaSyApnoIaEE7mM9vqEw0oS8bFY1LVKSDfXOE";

const pubSearch = searchForPub(KEY);

class App extends Component {
  state = {
    pubs: [],
    relatedPubs: [],
    activeLocation: null,
    locationInfo: null
  };

  componentDidMount() {
    this.handleSearchQuery(this.props.defaultQuery);
  }

  handleSearchQuery = query => {
    pubSearch(query).then(pubs => this.setState({ pubs }));
  };

  onSearch = event => {
    const value = event.target.value;
    this.handleSearchQuery(value);
  };

  handlePubClick = marker => {
    const { lat, lng } = marker.getPosition();
    this.setState({
      activeLocation: marker
    });
    getDetails(`${lat()},${lng()}`).then(response => {
      this.setState({
        locationInfo: response && response.response.venues
      });
    });
  };

  render() {
    return (
      <div>
        <Header />
        <main>
          <Search onChange={this.onSearch} />
          <SearchList pubs={this.state.pubs} />
          <div>
            {this.state.locationInfo &&
              this.state.locationInfo.map(venue => <div>{venue.name}</div>)}
          </div>
          <Map
            center={{
              lat: 51.5401,
              lng: -0.1426
            }}
            pubs={this.state.pubs}
            onPubClick={this.handlePubClick}
          />
        </main>
      </div>
    );
  }
}

export default App;
