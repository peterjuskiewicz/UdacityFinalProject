import React from 'react'


const SearchList = props => {

    console.log(props)

    return (
        <ul id="search-list-container">
            {props.pubs.map((pub, index) => <li key={index}>{pub.name}</li>)}
        </ul>);
};



export default SearchList;