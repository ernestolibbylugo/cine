import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="page dashboard-page">
      <h1>Dashboard</h1>
      <p>Bienvenido al panel principal.</p>
      <div className="info-card">
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Rol:</strong> {user?.role}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;