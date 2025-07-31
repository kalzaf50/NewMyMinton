// Import React hooks for managing state and side effects
import { useEffect, useState } from 'react';

// Import CSS styles for the Booking page
import './Booking.css';

// Import the custom dropdown component used to select areas
import { DropDownList } from '../components/DropDownList';

// React Router hook to access location state passed from previous navigation
import { useLocation } from 'react-router-dom';

const Booking = () => {
  // Retrieve navigation state (selectedPlace) from Home page
  const location = useLocation();

  // Initialize selectedPlace with the one passed from Home, or default to empty string
  const [selectedPlace, setSelectedPlace] = useState(location.state?.selectedPlace || '');

  // State to store the list of areas (places)
  const [places, setPlaces] = useState([]);

  // Loading state to show feedback during data fetching
  const [loading, setLoading] = useState(true);

  // Fetch all areas (and their courts) from the backend API
  const fetchPlaces = async () => {
    try {
      setLoading(true); // Show loading while fetching
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/areas`);
      const data = await res.json(); // Convert response to JSON
      setPlaces(data); // Store places into state
    } catch (error) {
      console.error('Failed to fetch places:', error); // Log error for debugging
    } finally {
      setLoading(false); // Stop loading in all cases
    }
  };

  // useEffect to fetch data only once when the component mounts
  useEffect(() => {
    fetchPlaces();
  }, []);

  // Find the currently selected place from the list to get its courts
  const currentPlace = places.find((p) => p.name === selectedPlace);

  return (
    <div className="booking-container">
      <h2 className="booking-title">BOOKING</h2>

      {/* Dropdown for selecting place/area */}
      <div className="booking-list">
        <DropDownList
          endpoint="areas"
          selected={selectedPlace}
          setSelected={setSelectedPlace}
        />
      </div>

      {/* Courts section */}
      <div className="courts-list">
        {loading && <p>Loading courts...</p>} {/* Show loading message */}
        {!loading && currentPlace?.courts?.length === 0 && <p>No courts available.</p>} {/* If no courts */}
        
        {/* Map and display list of courts for the selected place */}
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
