# 🍿 Equipo4 - Sistema de Cine

Aplicación web para la gestión de un cine (cartelera, compra de boletos,
dulcería y roles de usuario) construida con **React + Vite** y
**JSON Server** como API simulada.

## 🚀 Cómo correr el proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Levantar la API simulada (JSON Server en http://localhost:3001)
npm run server

# 3. Levantar la app de desarrollo (Vite)
npm run dev
```

> ⚠️ Necesitas **dos terminales**: una para `npm run server` y otra para `npm run dev`.

## 🔐 Credenciales de prueba

| Rol    | Email          | Contraseña |
| ------ | -------------- | ---------- |
| Admin  | admin@cine.com | `1234`     |
| Usuario| user@cine.com  | `1234`     |

## 🗂️ Estructura del proyecto

```
src/
├── components/   # Componentes reutilizables (Navbar, RutaProtegida, ...)
├── context/      # Contextos de React (AuthContext)
├── hooks/        # Hooks personalizados (useLocalStorage)
├── pages/        # Páginas (Login, Cartelera, Dulcería, AdminPanel, ...)
├── routes/       # Definición única de rutas (Routing.jsx)
├── services/     # Llamadas a la API (authService)
├── App.jsx       # Composición principal (AuthProvider + Navbar + Routing)
└── main.jsx      # Punto de entrada (BrowserRouter)
```

## 🤝 Convenciones para el equipo

- **Carpetas en minúsculas** (`components`, `context`, `pages`, `routes`,
  `services`, `hooks`). Respeta la mayúscula/minúscula en los `import`:
  los compañeros en Linux/macOS fallarán si no coincide con el nombre real
  del archivo.
- **Rutas**: todas se definen en `src/routes/Routing.jsx`.
- **Rutas protegidas**: usa `<RutaProtegida rolesPermitidos={['admin']} />`
  (por defecto permite `admin` y `user`). Redirige a `/login` si no hay
  sesión y a `/acceso-denegado` si el rol no tiene permiso.
- **Autenticación**: usa `useAuth()` del `AuthContext`; la sesión se guarda
  en `localStorage` bajo la clave `cine_user`.

## 📖 Ramas del equipo

- `main` — rama de integración.
- `feature/roles` — roles y permisos.
- `feature/datos-cartelera-ernesto` — cartelera y dulcería con JSON Server.
- `UI,-estilos-y-componentes-visuales` — estilos y componentes visuales.
- `moises` — autenticación y paneles base.

Siempre crea tu rama desde `main` y mantenla actualizada antes de abrir el
Pull Request.
