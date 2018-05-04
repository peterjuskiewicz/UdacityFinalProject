const getDetails = (ll) => {
    fetch('https://api.foursquare.com/v2/venues/search?'
        + 'll=' + ll
        + '&client_id=JRAYXFXTBU2G5D2QT4KLVEMCOL2UCJD0AQK1GBRLR2SWYHOG'
        + '&client_secret=1MEMHQZPNZSZNYOWRHGZ0Z4M5WSZE3LG0V5UUXVTYG1IKS0G&v=20180323',
        {mode: 'cors'})
        .then((res) => {
            console.log(res);
            return res.json()})
        .then((res) => {
            console.log(res)})
        .catch((e) => {
            const error = `Request failed. Returned ${e}`;
            console.log(error);
        })
}

export const searchForPub = key => postcode => {
    let pubRequest =
        'https://maps.googleapis.com/maps/api/place/textsearch/json?'
        + 'query=pub+London+'
        +  postcode
        + '&key=' + key;


    fetch(pubRequest,
        {mode: 'cors'})
        .then((res) => {
            console.log(res);
            return res.json()})
        .then((res) => {
            console.log(res);
            let ll = res.results[0].geometry.location.lat + ',' + res.results[0].geometry.location.lng;
            getDetails(ll);})
        .catch((e) => {
            const error = `Request failed. Returned ${e}`;
            console.log(error);
        })
}