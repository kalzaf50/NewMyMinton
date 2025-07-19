/*Libraries*/
import React, { useState } from "react";
import './PlaceSearchBox.css';

export const PlaceSearchBox = ({ setResults, endpoint }) => {
    const[input, setInput] = useState("")

    const fetchData = (value) => {
      fetch(`${process.env.REACT_APP_API_PLAYER_URL}?name=${value}`)
        .then((response) => response.json())
        .then((json) => {
          setResults(json);
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