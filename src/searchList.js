import React from 'react'
import Button from 'material-ui/Button';
import './searchList.css';

const ResultItem = ({ handleClick, item }) =>
  <Button onClick={() => handleClick(item)}>{item && item.name}</Button>;

const SearchList = props => {
    return (
        <ul className="search-list-container">
            {props.pubs && props.pubs.map((pub, index) => pub && <li className="search-result" key={index}>
              <ResultItem item={pub} handleClick={props.onItemClick} />
            </li>)}
        </ul>);
};



export default SearchList;
