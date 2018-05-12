import React from "react";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";

const LocationInfo = ({ name, opening_hours, rating }) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="headline" component="h2">
        {name}
      </Typography>
      <Typography component="p">Open now</Typography>
      <Typography component="h5">Open now</Typography>
      {rating && <Typography component="p">Rating: {rating}</Typography>}
    </CardContent>
  </Card>
);

export default LocationInfo;
