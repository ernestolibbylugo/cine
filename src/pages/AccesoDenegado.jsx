<<<<<<< HEAD
import { Link } from 'react-router-dom';

const AccesoDenegado = () => (
  <div className="page denied-page">
    <h1>⛔ Acceso Denegado</h1>
    <p>No tienes permisos para acceder aquí.</p>
    <Link to="/dashboard" className="btn-link">
      Volver al Dashboard
    </Link>
  </div>
);
=======
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AccesoDenegado = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
>>>>>>> 4dea81b833245d2df20128e5113189ef4f53562c

  const mensajeError = location.state?.mensaje || 'No tienes permisos para consultar esta sección.';

  return (
    <div style={{
      maxWidth: '500px',
      margin: '4rem auto',
      padding: '2rem',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#e53e3e', fontSize: '1.8rem', marginBottom: '1rem' }}>
        🚫 403 - Acceso Restringido
      </h1>
      
      <p style={{ color: '#4a5568', marginBottom: '1.5rem', lineHeight: '1.5' }}>
        {mensajeError}
      </p>

      {user && (
        <p style={{ fontSize: '0.85rem', color: '#718096', marginBottom: '1.5rem' }}>
          Usuario actual: <strong>{user.email || user.name}</strong> | Rol: <strong>{user.role}</strong>
        </p>
      )}

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '0.6rem 1.2rem',
            backgroundColor: '#3182ce',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Ir al Dashboard
        </button>
      </div>
    </div>
  );
};

export default AccesoDenegado;