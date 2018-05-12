import React from "react";
import importer from "./importer";
import "./Map.css";
import { GOOGLE_PLACES_API_KEY } from "./config";

const GOOGLE_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}`;

class Map extends React.Component {
  state = { markers: [] };
  constructor(props) {
    super(props);
    // creating a ref to the DOM element for the Google Maps to render at
    this.mapElement = React.createRef();
  }

  componentDidMount() {
    // importing the Google Maps API script asynchronously
    importer.url(GOOGLE_URL).then(() => {
      this.renderMap();
      this.renderMarkers();
    });
  }

  centerMap = location => {
    this.map && this.map.setCenter(location);
  };

  renderMarker = marker => {
    marker.setMap(this.map);
    marker.addListener("click", () => {
      const { lat, lng } = marker.getPosition();
      this.props.onPubClick({ lat: lat(), lng: lng() });
    });
  };

  componentDidUpdate(nextProps) {
    if (this.props.pubs !== nextProps.pubs) {
      this.renderMarkers();
    }
    this.centerMap(nextProps.center);
    // stopping animation for all markers before animating
    // the marker for the active location
    this.stopAnimation();
    this.animateMarker(nextProps.activeLocation && nextProps.activeLocation.id);
  }

  animateMarker = id => {
    this.state.markers.map(marker => {
      if (id === marker.id) {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
      }
    });
  };

  renderMap() {
    this.map = new window.google.maps.Map(this.mapElement.current, {
      zoom: 17,
      center: this.props.center,
      scrollwheel: false
    });
  }

  renderMarkers() {
    this.clearMarkers();
    this.setState(
      {
        markers:
          this.props.pubs &&
          this.props.pubs.map(
            pub =>
              new window.google.maps.Marker({
                position: pub && pub.geometry.location,
                id: pub && pub.id
              })
          )
      }, // using a setState callback to ensure we're using an updated state in the next line
      () => {
        this.state.markers.map(marker => this.renderMarker(marker));
      }
    );
  }

  clearMarkers = () => {
    this.state.markers.map(marker => marker.setMap(null));
  };

  stopAnimation = () => {
    this.state.markers.map(marker => marker.setAnimation(null));
  };

  render() {
    return (
      <div>
        <div aria-label="Map" className="map" ref={this.mapElement} />
      </div>
    );
  }
}

export default Map;
