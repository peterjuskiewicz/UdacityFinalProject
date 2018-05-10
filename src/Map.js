import React from 'react';
import importer from './importer';
import './Map.css';

const KEY = 'AIzaSyB1bKoTnnKP4VgZuKoJWb3LVocQVs5NRkc';
const GOOGLE_URL = `https://maps.googleapis.com/maps/api/js?key=${KEY}`;

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.mapElement = React.createRef();
    }

    componentDidMount() {
        importer.url(GOOGLE_URL).then(() => {
            this.renderMap();
            this.renderMarkers();
        })
    }

  centerMap = location => {
    this.map && this.map.setCenter(location);
  }

  renderMarker = position => {
    let marker = new window.google.maps.Marker({
      position,
      title: 'Hello World!'
    });

    marker.setMap(this.map);
    marker.addListener('click', () => {
      const { lat, lng } = marker.getPosition();
      this.props.onPubClick({ lat: lat(), lng: lng() });
    })
  };

  componentDidUpdate(nextProps) {
        if (this.props.center !== nextProps.center || this.props.pubs !== nextProps.pubs) {
          this.centerMap(nextProps.center);
          this.renderMarkers();
    }
  }

    renderMap() {
        this.map = new window.google.maps.Map(this.mapElement.current, {
            zoom: 17,
            center: this.props.center,
            scrollwheel: false,
        });
    }

    renderMarkers() {
        this.props.pubs && this.props.pubs.map(pub => {
            this.renderMarker(pub && pub.geometry.location)
        })
    }

    render() {
        return (<div>
            <div aria-label="Map" className="map" ref={this.mapElement} />
        </div>);
    }
};


export default Map;