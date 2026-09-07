import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePurchases } from "../context/PurchaseContext";
import { createPurchase } from "../services/api";

const TICKET_PRICE = 4500;

function Carrito() {
  const { user } = useAuth();
  const { items, updateQuantity, clearCart, addTicketSale } = usePurchases();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const confirmPayment = async () => {
    if (!user) {
      navigate("/login", { state: { from: "/carrito" } });
      return;
    }

    setSaving(true);
    setError("");
    try {
      const purchase = await createPurchase({
        userId: user.id,
        tickets: items.filter((item) => item.type === "ticket").map((item) => ({
          movieId: item.movieId,
          movieTitle: item.movieTitle,
          showId: item.showId,
          showTime: item.showTime,
          quantity: item.quantity,
        })),
        snacks: items.filter((item) => item.type === "snack").map(({ id, name, quantity }) => ({ id, name, quantity })),
        total,
        status: "confirmed",
      });
      addTicketSale({ ...purchase, total, items });
      clearCart();
      setMessage("Pago confirmado. Tu orden quedó registrada.");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="page cinema-page cart-page">
      <span className="eyebrow">Tu orden</span>
      <h1>Revisa antes de pagar.</h1>
      <p className="section-subtitle">Confirma películas, funciones y cantidades antes de finalizar tu compra.</p>
      {items.length === 0 ? (
        <div className="empty-cart glass-panel">
          <h2>Tu carrito está vacío.</h2>
          <p>Elige una película o agrega algo de la dulcería para comenzar.</p>
          <button className="btn-primary" type="button" onClick={() => navigate("/cartelera")}>Explorar cartelera</button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list glass-panel">
            {items.map((item) => (
              <article className="cart-row" key={item.id}>
                <div className="cart-row-image">{item.image ? <img src={item.image} alt="" /> : <span>CS</span>}</div>
                <div className="cart-row-info">
                  <strong>{item.movieTitle || item.name || item.title}</strong>
                  <span>{item.type === "ticket" ? `${item.showTime} · Sala ${item.room}` : "Dulcería"}</span>
                  <div className="quantity-control">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Reducir cantidad">−</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Aumentar cantidad">+</button>
                  </div>
                </div>
                <strong className="cart-row-price">₡{(item.price * item.quantity).toLocaleString("es-CR")}</strong>
              </article>
            ))}
            <button className="clear-cart" type="button" onClick={clearCart}>Vaciar carrito</button>
          </div>
          <aside className="cart-checkout glass-panel">
            <span className="eyebrow">Resumen de pago</span>
            <div><span>Artículos</span><strong>{items.reduce((sum, item) => sum + item.quantity, 0)}</strong></div>
            <div className="cart-total"><span>Total</span><strong>₡{total.toLocaleString("es-CR")}</strong></div>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <button className="btn-primary" type="button" disabled={saving} onClick={confirmPayment}>{saving ? "Procesando pago..." : "Confirmar y pagar"}</button>
          </aside>
        </div>
      )}
    </section>
  );
}

export default Carrito;
