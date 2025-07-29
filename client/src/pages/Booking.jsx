import { useEffect, useState } from 'react';
import './Booking.css';
import { DropDownList } from '../components/DropDownList';
  import { useLocation } from 'react-router-dom';


const Booking = () => {
  const location = useLocation();
  const [selectedPlace, setSelectedPlace] = useState(location.state?.selectedPlace || '');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/areas`);
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
          endpoint="areas"
          selected={selectedPlace}
          setSelected={setSelectedPlace}
        />
      </div>

      <div className="courts-list">
        {loading && <p>Loading courts...</p>}
        {!loading && currentPlace?.courts?.length === 0 && <p>No courts available.</p>}
        
        {!loading && currentPlace?.courts?.map((court, idx) => (
          <div key={court._id || idx} className="court-item">
            <h3>{court.name}</h3>
            <p><strong>Location:</strong> {court.location}</p>
            <p><strong>Contact:</strong> {court.contact || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
