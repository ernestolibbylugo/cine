import { Link, useLocation } from 'react-router-dom';

const AccesoDenegado = () => {
  const location = useLocation();
  return (
    <div className="page denied-page">
      <h1>403</h1>
      <h2>Acceso denegado</h2>
      <p>{location.state?.mensaje || 'No tienes permisos para consultar esta sección.'}</p>
      <Link to="/dashboard" className="btn-link">Volver al Dashboard</Link>
    </div>
  );
};

export default AccesoDenegado;