import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutButton from './LogoutButton';
import logo from '../Img/logoCinemaSein.jpeg';

const navLinkClass = ({ isActive }) =>
  isActive ? 'nav-link active' : 'nav-link';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand"><img src={logo} alt="Cinema SEIN" /><span> Cinema SEIN</span></NavLink>
      <div className="nav-links">
        <NavLink to="/cartelera" className={navLinkClass}>
          Cartelera
        </NavLink>
        <NavLink to="/comprar" className={navLinkClass}>
          Comprar boletos
        </NavLink>
        <NavLink to="/dulceria" className={navLinkClass}>
          Dulcería
        </NavLink>

        {user ? (
          <>
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
            {user.role === 'admin' && (
              <NavLink to="/admin" className={navLinkClass}>
                Panel Admin
              </NavLink>
            )}
            <span className="nav-user">{user.email}</span>
            <span className={`nav-role role-${user.role}`}>{user.role}</span>
            <LogoutButton />
          </>
        ) : (
          <NavLink to="/login" className={navLinkClass}>
            Iniciar Sesión
          </NavLink>
        )}
      </div>
    </nav>
  );
};


  

        export default Navbar;