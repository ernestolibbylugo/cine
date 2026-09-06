import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Asiento from '../components/Asiento';
import { getSeats } from '../services/api';

const seatRows = ['A', 'B', 'C', 'D', 'E', 'F'];

function Asientos() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!state?.show?.id) return;

    getSeats(state.show.id)
      .then((seats) => setOccupiedSeats(seats.filter((seat) => seat.status === 'occupied').map((seat) => seat.code)))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [state?.show?.id]);

  const toggleSeat = (seat) => {
    setSelectedSeats((current) => current.includes(seat) ? current.filter((item) => item !== seat) : [...current, seat]);
  };

  if (!state?.show) return <section className="page error-page"><p className="error-message">Selecciona una función antes de elegir tus asientos.</p><button className="btn-primary" type="button" onClick={() => navigate('/comprar')}>Volver a funciones</button></section>;
  if (loading) return <p className="loading-session">Consultando disponibilidad...</p>;
  if (error) return <section className="page error-page"><p className="error-message">{error}</p><button className="btn-primary" type="button" onClick={() => navigate('/comprar')}>Volver a funciones</button></section>;

  return (
    <div className="cinema-page seat-page">
      <div className="section-heading">
        <div><span className="eyebrow">Sala {state.show.room} · Función {state.show.time}</span><h1>Elige tus asientos</h1><p className="section-subtitle">{state.movie.title}</p></div>
        <div className="selected-summary"><strong>{selectedSeats.length}</strong><span>asientos elegidos</span></div>
      </div>
      <div className="screen">PANTALLA</div>
      <div className="seat-map" aria-label="Mapa de asientos">
        {seatRows.map((row) => <div className="seat-row" key={row}>
          <span className="row-label">{row}</span>
          {[1, 2, 3, 4, 5, 6].map((number) => {
            const seat = `${row}${number}`;
            const status = occupiedSeats.includes(seat) ? 'occupied' : selectedSeats.includes(seat) ? 'selected' : 'available';
            return <Asiento key={seat} label={seat} status={status} onSelect={() => toggleSeat(seat)} />;
          })}
        </div>)}
      </div>
      <div className="seat-footer">
        <div className="seat-legend"><span><i className="legend-dot available-dot" />Disponible</span><span><i className="legend-dot selected-dot" />Seleccionado</span><span><i className="legend-dot occupied-dot" />Ocupado</span></div>
        <button type="button" className="btn-primary" disabled={!selectedSeats.length} onClick={() => navigate('/resumen', { state: { ...state, selectedSeats } })}>Continuar con {selectedSeats.length} boletos</button>
      </div>
    </div>
  );
}

export default Asientos;
