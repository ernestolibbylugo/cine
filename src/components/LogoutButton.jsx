import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ className = '' }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // Limpia estado y localStorage (desde AuthContext)
    navigate('/login'); // Redirige al login
  };

  return (
    <button
      onClick={handleLogout}
      className={`btn-logout ${className}`}
      type="button"
    >
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;