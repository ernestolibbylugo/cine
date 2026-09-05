<<<<<<< HEAD
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
=======
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? '#63b3ed' : '#ffffff',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    padding: '0.4rem 0.8rem',
    borderRadius: '4px',
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
    transition: 'background-color 0.2s, color 0.2s',
  });

  return (
    <header
      style={{
        backgroundColor: '#1a202c',
        color: '#ffffff',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        <NavLink
          to="/dashboard"
          style={{
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>🍿</span> CineApp
        </NavLink>
>>>>>>> 4dea81b833245d2df20128e5113189ef4f53562c

        <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <NavLink to="/cartelera" style={navLinkStyle}>
            Cartelera
          </NavLink>
          <NavLink to="/dulceria" style={navLinkStyle}>
            Dulcería
          </NavLink>

          {user && (
            <>
              <NavLink to="/dashboard" style={navLinkStyle}>
                Dashboard
              </NavLink>
              {user.role === 'admin' && (
                <NavLink to="/admin" style={navLinkStyle}>
                  Panel Admin
                </NavLink>
              )}
            </>
          )}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {user ? (
          <>
            <span style={{ fontSize: '0.9rem', color: '#cbd5e0' }}>
              {user.email} (<strong>{user.role}</strong>)
            </span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#e53e3e',
                color: '#ffffff',
                border: 'none',
                padding: '0.4rem 0.9rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <NavLink to="/login" style={navLinkStyle}>
            Iniciar Sesión
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Navbar;