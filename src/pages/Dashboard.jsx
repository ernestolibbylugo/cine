import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div className="page dashboard-page">
      <span className="eyebrow">Tu cuenta en CineApp</span>
      <h1>Bienvenido, {user?.name || user?.email}</h1>
      <p>Desde aquí puedes continuar con tu próxima experiencia de cine.</p>
      <div className="info-card">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Rol:</strong> {user?.role}</p>
      </div>
    </div>
  );
};

export default Dashboard;