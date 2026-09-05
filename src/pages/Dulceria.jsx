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
    return <p className="loading-session">Cargando dulcería...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="cinema-page">
      <section className="snack-hero">
        <div>
          <span className="eyebrow">Dulcería del cine</span>
          <h1>La película empieza antes de la película.</h1>
          <p>Arma tu combo favorito y llévalo directo a tu función.</p>
        </div>
      </section>
      <div className="section-heading snack-heading">
        <div><span className="eyebrow">Para compartir</span><h2>Antojos de la casa</h2></div>
      </div>
      <section className="snack-grid">
        {snacks.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          snacks.map((snack) => (
            <article className="snack-card" key={snack.id}>
              <div className="snack-card-body">
                <h3>{snack.name}</h3>
                <div className="snack-card-footer">
                  <strong>₡{snack.price}</strong>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

export default Dulceria;