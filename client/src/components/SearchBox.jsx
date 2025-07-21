/*Libraries*/
import React, { useState } from "react";
import './SearchBox.css';

export const SearchBox = ({ setResults, endpoint }) => {
    const[input, setInput] = useState("")

    const fetchData = (value) => {
      const url = `${process.env.REACT_APP_API_BASE_URL}/${endpoint}?name=${value}`;
      console.log("Fetching URL:", url);
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          const capitalizedResults = json.map(item => ({
              ...item,
              name: item.name.toUpperCase()
          }));
          setResults(capitalizedResults);
        });
    };

    const handleChange = (value) => {
      setInput(value);
      fetchData(value);
    };

    return <div className='input-wrapper'>
      <input placeholder='Type to search...' 
      value={input} 
      onChange={(e) => handleChange(e.target.value)}/>
    </div>;
};