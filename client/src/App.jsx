import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Players from './pages/Players';
import Booking from './pages/Booking';

function App() {
  return (
    <Router>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/players" element={<Players />} />
            <Route path="/booking" element={<Booking />} /> 
            <Route path="/booking/:area" element={<Booking />} />
          </Routes>
        </div>
        <footer style={{ padding: '1rem', textAlign: 'center', fontFamily: "'normal', sans-serif"}}>
          &copy; {new Date().getFullYear()} Kalzaf. All rights reserved.
        </footer>
      </div>
    </Router>
  );
}


export default App;
