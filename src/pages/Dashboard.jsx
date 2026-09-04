import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
      <h1>🎬 Cartelera y Dashboard</h1>
      <p style={{ marginTop: '1rem', color: '#4a5568' }}>
        ¡Bienvenido/a, <strong>{user?.email}</strong>! Has ingresado con el rol de <strong>{user?.role}</strong>.
      </p>
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '6px', border: '1px solid #edf2f7' }}>
          <h3>Película 1</h3>
          <p>Película destacada para todos los usuarios.</p>
        </div>
        <div style={{ padding: '1.5rem', background: '#f7fafc', borderRadius: '6px', border: '1px solid #edf2f7' }}>
          <h3>Película 2</h3>
          <p>Próximos estrenos en cartelera.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
