import React from "react";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import "./searchList.css";

const ResultItem = ({ handleClick, item }) => (
  <Button onClick={() => handleClick(item)}>{item && item.name}</Button>
);

const SearchList = props => {
  return (
    <ul className="search-list-container">
      { props.errorMessage &&  <Typography component="p">{props.errorMessage}</Typography> }
      { props.pubs.length === 0 &&  <Typography component="p">No search results</Typography> }
      {props.pubs &&
        props.pubs.map(
          pub =>
            pub && (
              <li className="search-result" key={pub.id}>
                <ResultItem item={pub} handleClick={props.onItemClick} />
              </li>
            )
        )}
    </ul>
  );
};

export default SearchList;
