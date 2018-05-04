import React from 'react'


const Search = props => {
    return (<div id="search-container">
        <input type="text" name="postcode" id="search-pub" onChange={props.onChange}/>
    </div>);
};



export default Search;