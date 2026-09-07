import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    setLoading(true);
    try {
      const user = await loginUser(formData.email.trim(), formData.password);
      if (!user) {
        setError('Correo o contraseña incorrectos.');
        return;
      }
      login(user);
      navigate('/dashboard');
    } catch {
      setError('No se pudo conectar con JSON Server. Ejecuta npm run server e inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <span className="eyebrow">Bienvenido a CineApp</span>
        <h2>Iniciar sesión</h2>
        {error && <div className="error-message" role="alert">{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="tu@email.com" autoComplete="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" autoComplete="current-password" required />
          </div>
          <button type="submit" className="btn-login" disabled={loading}>{loading ? 'Verificando...' : 'Ingresar'}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;