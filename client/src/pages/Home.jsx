/*Libraries*/
import { useState } from "react";

/*Styles*/
import './Home.css';

/*Components*/
import { PlaceSearchBox } from '../components/PlaceSearchBox';
import { PlaceSearchList } from '../components/PlaceSearchList';
import Button from 'react-bootstrap/Button';

/*Images*/
import tourny1 from '../assets/images/tourny1.jpeg';
import tourny2 from '../assets/images/tourny2.jpg';
import tourny3 from '../assets/images/tourny3.jpg';
import tourny4 from '../assets/images/tourny5.jpg';

const Home = () => {
  const [results, setResults] = useState([]);

  return (
    <>
    <section className="block-with-bg-img-1">
      <div className="text-overlay">
        <h1 style={{ textAlign:'left' }}>WHERE CHAMPIONS MEET</h1>
        <p style={{ textAlign:'left' }}>Book your court, join events, and track player stats!</p>
      </div>
      <div className='search-bar-container'>
        <div>Tempah Lokasi</div>
        <PlaceSearchBox setResults={setResults} />
        {results && results.length > 0 && <PlaceSearchList results={results} />}
      </div>
    </section>

    <div className="container">
      <h2 style={{ color: "black", paddingTop: 30, textAlign: "center" }}>LATEST TOURNAMENTS</h2>
    </div>

    <section className="scroll-wrapper">
      <div className="scroll-container">
        <div className="tournament">
          <img src={tourny1} alt="Tournament 1" />
          <p>Tournament 1: Date & Location</p>
        </div>
        <div className="tournament">
          <img src={tourny2} alt="Tournament 2" />
          <p>Tournament 2: Date & Location</p>
        </div>
        <div className="tournament">
          <img src={tourny3} alt="Tournament 3" />
          <p>Tournament 3: Date & Location</p>
        </div>
        <div className="tournament">
          <img src={tourny4} alt="Tournament 4" />
          <p>Tournament 4: Date & Location</p>
        </div>
        <div className="tournament">
          <img src={tourny1} alt="Tournament 5" />
          <p>Tournament 5: Date & Location</p>
        </div>
      </div>
    </section>
    </>
  );
};

export default Home;