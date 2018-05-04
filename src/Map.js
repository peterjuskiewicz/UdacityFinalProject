import React from 'react'
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
            this.map = new window.google.maps.Map(this.mapElement.current, {
                zoom: 17,
                center: this.props.center,
                scrollwheel: false,
            });
        })
    }

    // componentWillReceiveProps(prevProps, NextProps) {
    //     this.map.
    // }

    center = () => {
        this.map.setCenter(this.props.center)
    };

    render() {
        return (<div>
            <div aria-label="Map" className="map" ref={this.mapElement} />
            <button onClick={this.center}>Center</button>
        </div>);
    }
};


export default Map;