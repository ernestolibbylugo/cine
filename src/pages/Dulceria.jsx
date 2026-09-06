import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { createPurchase } from "../services/api";
import { useAuth } from "../context/AuthContext";

function Dulceria() {
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetch(`${API_URL}/snacks`)
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

  const addSnack = (snack) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === snack.id);
      if (existing) return current.map((item) => item.id === snack.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...snack, quantity: 1 }];
    });
    setMessage("");
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const confirmSnacks = async () => {
    if (!user) { setMessage("Inicia sesión para confirmar tu pedido."); return; }
    try {
      await createPurchase({ userId: user.id, snacks: cart.map(({ id, name, quantity }) => ({ id, name, quantity })), total: cartTotal, status: "confirmed" });
      setCart([]);
      setMessage("Pedido enviado a la dulcería. Te estará esperando.");
    } catch (requestError) { setMessage(requestError.message); }
  };

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
        <div className="cart-badge"><span>Pedido</span><strong>{cart.reduce((total, item) => total + item.quantity, 0)}</strong></div>
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
                  <button type="button" className="btn-add" onClick={() => addSnack(snack)}>Añadir</button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
      {cart.length > 0 && <div className="snack-order"><p>{cart.map((item) => `${item.quantity} × ${item.name}`).join(" · ")}</p><strong>₡{cartTotal.toLocaleString("es-CR")}</strong><button type="button" className="btn-primary" onClick={confirmSnacks}>Confirmar pedido</button></div>}
      {message && <p className="success-message" role="status">{message}</p>}
    </div>
  );
}

export default Dulceria;