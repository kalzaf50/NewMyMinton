import React, { useState, useEffect, useRef } from "react";
import { PlaceSearchResult } from "./PlaceSearchResult";
import "./DropDownList.css";

export const DropDownList = ({ endpoint, selected, setSelected }) => {
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch data from API
  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/${endpoint}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setResults(data); 
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    }

    fetchPlaces();
  }, [endpoint]);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div
        className="dropdown-header"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selected ? selected : "Select a place"}</span>
        <span>▼</span>
      </div>

      {isOpen && (
        <ul className="dropdown-list">
          {results.map((result, index) => (
            <p
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleOptionClick(result.name);
              }}
              className="dropdown-list-item"
            >
              <PlaceSearchResult result={result.name} />
            </p>
          ))}
        </ul>
      )}
    </div>
  );
};
