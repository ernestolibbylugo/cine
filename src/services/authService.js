const API_URL = 'http://localhost:3001/users';

/**
 * Busca un usuario por email y contraseña en JSON Server
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object|null>} Usuario encontrado o null
 */
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(
      `${API_URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    );

    if (!response.ok) {
      throw new Error('Error en el servidor');
    }

    const users = await response.json();

    // JSON Server devuelve un array; validamos que exista exactamente 1 coincidencia
    if (users.length === 1) {
      return users[0];
    }

    return null;
  } catch (error) {
    console.error('Error en autenticación:', error);
    throw error;
  }
};