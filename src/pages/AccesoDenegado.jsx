import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AccesoDenegado = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <h1 style={{ color: '#e53e3e', fontSize: '2rem' }}>403 - Acceso Denegado</h1>
      <p style={{ margin: '1rem 0', color: '#4a5568' }}>
        Lo sentimos, tu usuario (Rol: <strong>{user?.role || 'Invitado'}</strong>) no tiene permisos para ver esta sección.
      </p>
      <button
        onClick={() => navigate('/dashboard')}
        style={{
          padding: '0.6rem 1.2rem',
          backgroundColor: '#3182ce',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Volver al Dashboard
      </button>
    </div>
  );
};

export default AccesoDenegado;