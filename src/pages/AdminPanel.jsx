import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { user } = useAuth();

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#fffaf0', borderColor: '#feebc8' }}>
      <h1 style={{ color: '#c05621' }}>🛠️ Panel de Administración</h1>
      <p style={{ marginTop: '1rem', color: '#7b341e' }}>
        Esta sección es <strong>exclusiva para administradores</strong>. Hola, <strong>{user?.email}</strong>.
      </p>
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#ffffff', borderRadius: '6px', border: '1px solid #fbd38d' }}>
        <h3>Gestión de Cine</h3>
        <ul style={{ marginTop: '0.5rem', lineHeight: '1.8' }}>
          <li>Añadir / Editar Funciones</li>
          <li>Gestionar Salas y Butacas</li>
          <li>Reportes de Ventas y Boletos</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
