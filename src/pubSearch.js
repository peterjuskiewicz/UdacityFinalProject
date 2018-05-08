export const getDetails = ll =>
  fetch(
    "https://api.foursquare.com/v2/venues/search?" +
      "ll=" +
      ll +
      "&client_id=JRAYXFXTBU2G5D2QT4KLVEMCOL2UCJD0AQK1GBRLR2SWYHOG" +
      "&client_secret=1MEMHQZPNZSZNYOWRHGZ0Z4M5WSZE3LG0V5UUXVTYG1IKS0G&v=20180323",
    { mode: "cors" }
  )
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(res => res)
    .catch(e => {
      const error = `Request failed. Returned ${e}`;
      console.log(error);
    });

export const searchForPub = key => postcode => {
  let pubRequest =
    "https://maps.googleapis.com/maps/api/place/textsearch/json?" +
    "query=pub+London+" +
    postcode +
    "&key=" +
    key;

  return fetch(pubRequest, { mode: "cors" })
    .then(res => {
      return res.json();
    })
    .then(res => {
      return res.results;
    })
    .catch(e => {
      const error = `Request failed. Returned ${e}`;
      console.log(error);
    });
};
