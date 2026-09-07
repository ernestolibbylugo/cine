import { AnimatePresence, motion } from "framer-motion";

function PremieresModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.section
            className="premieres-modal glass-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="premieres-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" aria-label="Cerrar" onClick={onClose}>×</button>
            <span className="eyebrow">Cinema SEIN presenta</span>
            <h2 id="premieres-title">Próximos Estrenos</h2>
            <p>La próxima gran historia ya tiene butaca reservada en tu imaginación.</p>
            <div className="premiere-list">
              <div><strong>Horizonte Cero</strong><span>Muy pronto · Ciencia ficción</span></div>
              <div><strong>Las Luces del Último Tren</strong><span>Estreno especial · Drama</span></div>
            </div>
            <button className="btn-primary" type="button" onClick={onClose}>Explorar cartelera</button>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PremieresModal;
