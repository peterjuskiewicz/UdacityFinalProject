import React from "react";
import { get } from 'lodash';
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";

const LocationInfo = ({ name, opening_hours, status, rating, description, price, formattedPhone, photo }) => (
  <Card>
    <CardContent>
      <Typography gutterBottom variant="headline" component="h2">
        {name}
      </Typography>
      { photo && <img src={photo.prefix + '300x200' + photo.suffix} alt="venue photograph"/> }
      { opening_hours.open_now && <Typography component="p"><strong>Open now</strong></Typography> }
      { status && <Typography component="p">{status}</Typography>}
      { formattedPhone && <Typography component="p">tel: {formattedPhone}</Typography>}
      { price  && <Typography component="p">Pricing: {price}</Typography>}
      {rating && <Typography component="p">Rating: {rating}</Typography>}
      {description && <Typography component="p">{description}</Typography>}
    </CardContent>
  </Card>
);

export default LocationInfo;
