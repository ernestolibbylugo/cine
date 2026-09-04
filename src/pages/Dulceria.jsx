import { useEffect, useState } from "react";

function Dulceria() {
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/snacks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo cargar la dulcería");
        }

        return response.json();
      })
      .then((data) => {
        setSnacks(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando dulcería...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Dulcería</h1>

      {snacks.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div>
          {snacks.map((snack) => (
            <article key={snack.id}>
              <h2>{snack.name}</h2>
              <p>Precio: ₡{snack.price}</p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default Dulceria;