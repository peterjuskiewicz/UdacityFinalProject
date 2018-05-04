import React, { Component } from 'react';
import './App.css';
import Header from "./Header";
import Map from './Map.js';
import Search from './Search.js';
import { searchForPub } from './pubSearch';

const KEY = 'AIzaSyB1bKoTnnKP4VgZuKoJWb3LVocQVs5NRkc';

const pubSearch = searchForPub(KEY);

class App extends Component {
    onSearch = event => {
        const value = event.target.value;

        console.log(value);
        pubSearch(value);
    };

    render() {
      return(
          <div>
              <Header/>
              <main>
                  <Search onChange={this.onSearch}/>
                <Map
                    center={{
                    lat: 51.5401,
                    lng: -0.1426
                    }}
                />
              </main>
          </div>);
  }
}

export default App;
