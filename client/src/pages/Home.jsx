/*Libraries*/
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*Styles*/
import './Home.css';

/*Components*/
import { DropDownList } from '../components/DropDownList';

/*Images*/
import defaultImage from '../assets/images/notfound.jpg';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const navigate = useNavigate();

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tournaments`);
      const data = await res.json();
      setTournaments(data);
    } catch (error) {
      console.error('Failed to fetch tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  useEffect(() => {
    if (selectedPlace) {
      navigate('/booking', { state: { selectedPlace } });
    }
  }, [selectedPlace, navigate]);

  return (
    <>
    <section className="block-with-bg-img-1">
      <div className="text-overlay">
        <h1 style={{ textAlign:'left' }}>WHERE CHAMPIONS MEET</h1>
        <p style={{ textAlign:'left' }}>Book your court, join events, and track player stats!</p>
      </div>
      <div className='search-bar-container'>
        <DropDownList
          endpoint="areas" 
          selected={selectedPlace}
          setSelected={setSelectedPlace}
        />
      </div>
    </section>

    <div className="container">
      <h2 style={{ color: "black", paddingTop: 30, textAlign: "center" }}>LATEST TOURNAMENTS</h2>
    </div>

    <section className="scroll-wrapper">
        <div className="scroll-container">
          {loading ? (
            <p>Loading tournaments...</p>
          ) : tournaments.length === 0 ? (
            <p>No tournaments available.</p>
          ) : (
            tournaments.map((tournament, index) => (
              <div className="tournament" key={index}>
                <img
                  src={tournament.poster || defaultImage}
                  alt={tournament.name}
                  onError={(e) => (e.target.src = defaultImage)}
                />
                <p style={{ fontWeight: 'bolder' }}>{tournament.name.toUpperCase()}</p>
                <p style={{ color: 'red' }}>{new Date(tournament.date).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default Home;