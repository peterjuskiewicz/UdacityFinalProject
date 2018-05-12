import React from "react";
import Input from "material-ui/Input";
import "./Search.css";

const Search = props => {
  return (
    <div className="search-container">
      <Input
        placeholder="postcode"
        name="postcode"
        className="search-pub"
        onChange={props.onChange}
      />
    </div>
  );
};

export default Search;
