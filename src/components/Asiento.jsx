function Asiento({ label, status = 'available', onSelect }) {
  return (
    <button
      type="button"
      className={`seat seat-${status}`}
      onClick={onSelect}
      disabled={status === 'occupied'}
      aria-label={`Asiento ${label}: ${status}`}
    >
      <span>{label}</span>
    </button>
  );
}

export default Asiento;
