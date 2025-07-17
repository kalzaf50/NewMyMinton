import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="nav">
      <div className="cell">
        <h2>
          <Link to="/" className="logo-link" style={{ color: 'rgba(223,32,39)', textDecoration: 'none' }}>
            MyMinton
          </Link>
        </h2>
      </div>
      <Link to="/booking" className="nav-link">BOOKING</Link>
      <Link to="/tournaments" className="nav-link">TOURNAMENTS</Link>
      <Link to="/players" className="nav-link">PLAYERS</Link>
      <Link to="/login" className="nav-link" style={{ marginLeft: '150px' }}>LOGIN</Link>
    </div>
  );
};

export default Navbar;
