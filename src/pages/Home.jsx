import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  return <Navigate to={user ? '/dashboard' : '/login'} replace />;
};

export default Home;
