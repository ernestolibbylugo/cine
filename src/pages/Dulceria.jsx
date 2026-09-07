import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { createPurchase } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import popcornImage from "../Img/imgPalomita.jpeg";
import sodaImage from "../Img/imgRefresco.jpeg";
import comboImage from "../Img/imgComboPareja.jpeg";
import { usePurchases } from "../context/PurchaseContext";

const snackImages = {
  "Palomitas medianas": popcornImage,
  "Refresco grande": sodaImage,
  "Refresco Grande": sodaImage,
  "Combo pareja": comboImage,
  "Combo Pareja": comboImage,
};

function Dulceria() {
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { addItem } = usePurchases();

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
    addItem({
      ...snack,
      type: "snack",
      title: snack.name,
      image: snackImages[snack.name],
    });
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
            <motion.article className="snack-card glass-panel" key={snack.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: snack.id * 0.08 }} whileHover={{ y: -7 }}>
              <div className="snack-art"><img src={snackImages[snack.name]} alt={snack.name} /></div>
              <div className="snack-card-body">
                <h3>{snack.name}</h3>
                <div className="snack-card-footer">
                  <strong>₡{snack.price}</strong>
                  <motion.button type="button" className="btn-add" whileTap={{ scale: 0.94 }} onClick={() => addSnack(snack)}>Añadir</motion.button>
                </div>
              </div>
            </motion.article>
          ))
        )}
      </section>
      {cart.length > 0 && <div className="snack-order"><p>{cart.map((item) => `${item.quantity} × ${item.name}`).join(" · ")}</p><strong>₡{cartTotal.toLocaleString("es-CR")}</strong><button type="button" className="btn-primary" onClick={confirmSnacks}>Confirmar pedido</button></div>}
      {message && <p className="success-message" role="status">{message}</p>}
    </div>
  );
}

export default Dulceria;