import { API_URL } from "../config.js";

/**
 * Credenciales de respaldo (idénticas a las de db.json).
 * Solo se usan si JSON Server no está disponible, para que el
 * login nunca deje de funcionar durante la demo.
 */
export const USUARIOS_LOCALES = [
  {
    id: "1",
    name: "Admin Cine",
    email: "admin@cine.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "Usuario Cine",
    email: "user@cine.com",
    password: "user123",
    role: "user",
  },
];

/**
 * Busca un usuario por email y contraseña.
 * Primero consulta JSON Server; si el servidor no está disponible,
 * cae a la lista local de respaldo para que el login funcione igual.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: Object|null, origen: 'api'|'local'}>}
 */
export const loginUser = async (email, password) => {
  const correo = (email ?? "").trim().toLowerCase();
  const contrasena = (password ?? "").trim();

  try {
    const response = await fetch(`${API_URL}/users`);

    if (!response.ok) {
      throw new Error("El servidor respondió con un error");
    }

    const users = await response.json();
    const userFound = users.find(
      (user) =>
        user.email.trim().toLowerCase() === correo &&
        user.password === contrasena
    );

    return { user: userFound ?? null, origen: "api" };
  } catch (error) {
    // Servidor caído o no arrancado: usamos las credenciales locales.
    console.warn(
      "JSON Server no disponible, verificando con credenciales locales…",
      error
    );

    const userFound = USUARIOS_LOCALES.find(
      (user) => user.email === correo && user.password === contrasena
    );

    return { user: userFound ?? null, origen: "local" };
  }
};