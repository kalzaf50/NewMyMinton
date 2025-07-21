import React, { useEffect, useState } from 'react';
import './Booking.css';
import { DropDownList } from '../components/DropDownList';

const Booking = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/places`);
      const data = await res.json();
      setPlaces(data);
    } catch (error) {
      console.error('Failed to fetch places:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  const currentPlace = places.find((p) => p.name === selectedPlace);

  return (
    <div className="booking-container">
      <h2 className="booking-title">BOOKING</h2>
      <div className="booking-list">
        <DropDownList
          endpoint="places" 
          selected={selectedPlace}
          setSelected={setSelectedPlace}
        />
      </div>

      <div className="courts-list">
        {currentPlace && currentPlace.courts && currentPlace.courts.map((court, idx) => (
          <div key={idx} className="court-item">
            {court}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
