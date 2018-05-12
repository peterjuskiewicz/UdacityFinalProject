export const getDetails = (ll, name) =>
  fetch(
    "https://api.foursquare.com/v2/venues/search?" +
      "ll=" +
      ll +
      "&categoryId=4bf58dd8d48988d11b941735" +
      "&client_id=JRAYXFXTBU2G5D2QT4KLVEMCOL2UCJD0AQK1GBRLR2SWYHOG" +
      "&client_secret=1MEMHQZPNZSZNYOWRHGZ0Z4M5WSZE3LG0V5UUXVTYG1IKS0G&v=20180323",
    { mode: "cors" }
  )
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(res => {
      const matchingVenues = res.response.venues.filter(venue => venue.name === name);
      return matchingVenues && matchingVenues[0].id
    })
    .catch(() => {
      throw '(No additional data)'
    })
    .then(venueId =>
      fetch(
        `https://api.foursquare.com/v2/venues/${String(
          venueId
        )}?&oauth_token=XVJPUCBTAT3S1ZHBRNTOYKPV1XIOY3R2UCN4IYN12NUMEBMO&v=20180512`,
        { mode: "cors" }
      )
    )
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(res => res.response && res.response.venue)
    .catch(e => {
      throw `${e}`;
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
      throw `Request failed. Returned ${e}`;
    });
};
