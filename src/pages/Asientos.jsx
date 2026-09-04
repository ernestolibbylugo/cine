import { useState } from 'react';
import Asiento from '../components/Asiento';

const seatRows = ['A', 'B', 'C', 'D', 'E', 'F'];
const occupiedSeats = ['A3', 'B5', 'C2', 'D6', 'E1'];

function Asientos() {
  const [selectedSeats, setSelectedSeats] = useState(['A4']);
  const toggleSeat = (seat) => {
    setSelectedSeats((current) => current.includes(seat) ? current.filter((item) => item !== seat) : [...current, seat]);
  };

  return (
    <div className="cinema-page seat-page">
      <div className="section-heading">
        <div><span className="eyebrow">Sala 04 · Función 19:40</span><h1>Elige tus asientos</h1><p className="section-subtitle">Dune: Parte Dos · Miércoles 04 de septiembre</p></div>
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
        <button type="button" className="btn-primary" disabled={!selectedSeats.length}>Continuar con {selectedSeats.length} boletos</button>
      </div>
    </div>
  );
}

export default Asientos;
