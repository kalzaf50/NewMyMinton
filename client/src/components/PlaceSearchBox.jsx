/*Libraries*/
import React, { useState } from "react";
import './PlaceSearchBox.css';

export const PlaceSearchBox = ({ setResults }) => {
    const[input, setInput] = useState("")

    const fetchData = (value) => {
    fetch(`https://my-json-server.typicode.com/kalzaf50/NewMyMinton/players?name_like=${value}`)
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