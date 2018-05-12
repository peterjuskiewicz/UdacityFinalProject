## How to run

Please install the dependencies with npm install and use `npm start` to run the application. Use `npm build` for a production build.

You need to have an `Allow-Control-Allow-Origin: *` extension installed and enabled in your browser for the Google Maps API to work
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi.

## Application
Application uses Google Maps and Forsquare APIs to fetch location and places data.

Main logic and application state is contained within App.js which serves as a container component.

Map.js uses createRef to save a DOM reference to the map element for the Google Maps to render in.

Please note that I'm using a default ServiceWorker created by React and it only works in production mode.