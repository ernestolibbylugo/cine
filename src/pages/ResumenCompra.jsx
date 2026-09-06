import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createPurchase } from "../services/api";

const TICKET_PRICE = 4500;

function ResumenCompra() {
  const { state } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const total = (state?.selectedSeats?.length ?? 0) * TICKET_PRICE;

  if (!state?.show || !state?.selectedSeats?.length) {
    return <section className="page error-page"><h1>Tu carrito está vacío.</h1><button className="btn-primary" type="button" onClick={() => navigate('/comprar')}>Ver funciones</button></section>;
  }

  const confirmPurchase = async () => {
    setSaving(true);
    setError("");
    try {
      await createPurchase({
        userId: user.id,
        movieId: state.movie.id,
        showId: state.show.id,
        seats: state.selectedSeats,
        total,
        status: "confirmed",
      });
      navigate('/dashboard', { state: { confirmation: `Reserva confirmada para ${state.movie.title}.` } });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  };

  return <section className="page cinema-page summary-page">
    <span className="eyebrow">Taquilla digital · Paso 2 de 2</span>
    <h1>Confirma tu escena.</h1>
    <div className="summary-list">
      <p><span>Película</span><strong>{state.movie.title}</strong></p>
      <p><span>Función</span><strong>{state.show.time} · Sala {state.show.room}</strong></p>
      <p><span>Asientos</span><strong>{state.selectedSeats.join(', ')}</strong></p>
      <p className="summary-total"><span>Total</span><strong>₡{total.toLocaleString('es-CR')}</strong></p>
    </div>
    {error && <p className="error-message">{error}</p>}
    <button className="btn-primary" type="button" disabled={saving} onClick={confirmPurchase}>{saving ? 'Guardando reserva...' : 'Confirmar compra'}</button>
  </section>;
}

export default ResumenCompra;
