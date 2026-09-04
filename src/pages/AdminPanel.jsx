const AdminPanel = () => (
  <div className="page admin-page">
    <h1>Panel de Administración</h1>
    <p>Solo administradores pueden ver esta sección.</p>
    <div className="admin-actions">
      <button className="btn-primary">Crear elemento</button>
      <button className="btn-danger">Eliminar elemento</button>
    </div>
  </div>
);

export default AdminPanel;
