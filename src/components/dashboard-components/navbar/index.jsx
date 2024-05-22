import { NavLink } from 'react-router-dom';
import './navbar.css'; 
import logo from "../../../assets/logo.svg";
import Gravatar from '../gravatar.jsx';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="Logo" /> 
      </div>
      <ul className="navbar__links">
        <li className="navbar__item">
          <NavLink to="/exchange" activeClassName="navbar__link--active" className="navbar__link">
            Exchange
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/wallet" activeClassName="navbar__link--active" className="navbar__link">
            Wallet
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink to="/roqqu-hub" activeClassName="navbar__link--active" className="navbar__link">
            Roqqu Hub
          </NavLink>
        </li>
      </ul>

      <Gravatar />
    </nav>
  );
};

export default Navbar;

