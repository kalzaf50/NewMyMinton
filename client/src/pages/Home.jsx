/* ------------------ Import Libraries ------------------ */
import { useState, useEffect } from "react"; // React hooks for state and side effects
import { useNavigate } from "react-router-dom"; // Used for navigation to another route

/* ------------------ Import Styles ------------------ */
import './Home.css'; // Component-specific styling

/* ------------------ Import Components ------------------ */
import { DropDownList } from '../components/DropDownList'; // Custom dropdown for selecting an area

/* ------------------ Import Assets ------------------ */
import defaultImage from '../assets/images/notfound.jpg'; // Fallback image if tournament poster is missing

/* ------------------ Main Component ------------------ */
const Home = () => {
  // State to track loading status of tournament data
  const [loading, setLoading] = useState(true);

  // State to store selected area/place from the dropdown
  const [selectedPlace, setSelectedPlace] = useState(null);

  // State to store tournament data fetched from the backend
  const [tournaments, setTournaments] = useState([]);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Function to fetch tournament data from backend API
  const fetchTournaments = async () => {
    try {
      setLoading(true); // Start loading before fetch
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tournaments`);
      const data = await res.json();
      setTournaments(data); // Save fetched tournaments to state
    } catch (error) {
      console.error('Failed to fetch tournaments:', error); // Error handling
    } finally {
      setLoading(false); // Stop loading regardless of success or failure
    }
  };

  // Run fetchTournaments once when the component mounts
  useEffect(() => {
    fetchTournaments();
  }, []);

  // Navigate to /booking with selectedPlace passed via state when user selects a place
  useEffect(() => {
    if (selectedPlace) {
      navigate('/booking', { state: { selectedPlace } });
    }
  }, [selectedPlace, navigate]);

  /* ------------------ Component UI ------------------ */
  return (
    <>
      {/* Hero Section with background image and text */}
      <section className="block-with-bg-img-1">
        <div className="text-overlay">
          <h1 style={{ textAlign: 'left' }}>WHERE CHAMPIONS MEET</h1>
          <p style={{ textAlign: 'left' }}>Book your court, join events, and track player stats!</p>
        </div>

        {/* Dropdown area search bar */}
        <div className='search-bar-container'>
          <DropDownList
            endpoint="areas" // API endpoint to fetch area options
            selected={selectedPlace}
            setSelected={setSelectedPlace} // Update selectedPlace when user selects
          />
        </div>
      </section>

      {/* Section title */}
      <div className="container">
        <h2 style={{ color: "black", paddingTop: 30, textAlign: "center" }}>
          LATEST TOURNAMENTS
        </h2>
      </div>

      {/* Horizontal scrollable tournament cards */}
      <section className="scroll-wrapper">
        <div className="scroll-container">
          {loading ? (
            // Show loading message while fetching tournaments
            <p>Loading tournaments...</p>
          ) : tournaments.length === 0 ? (
            // Show message if no tournaments are found
            <p>No tournaments available.</p>
          ) : (
            // Map through tournaments and display each one
            tournaments.map((tournament, index) => (
              <div className="tournament" key={index}>
                <img
                  src={tournament.poster || defaultImage} // Use poster if available, else fallback
                  alt={tournament.name}
                  onError={(e) => (e.target.src = defaultImage)} // Fallback if image fails to load
                />
                <p style={{ fontWeight: 'bolder' }}>
                  {tournament.name.toUpperCase()}
                </p>
                <p style={{ color: 'red' }}>
                  {new Date(tournament.date).toLocaleDateString()} {/* Format date */}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
