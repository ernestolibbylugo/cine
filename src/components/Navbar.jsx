import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LogoutButton from './LogoutButton';

const navLinkClass = ({ isActive }) =>
  isActive ? 'nav-link active' : 'nav-link';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand">🍿 Equipo4 App</div>
      <div className="nav-links">
        <NavLink to="/cartelera" className={navLinkClass}>
          Cartelera
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
