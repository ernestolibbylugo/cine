function ProductoDulceria({ product, onAdd }) {
  return (
    <article className="snack-card">
      <div className={`snack-art snack-art-${product.color}`} aria-hidden="true"><span>{product.emoji}</span></div>
      <div className="snack-card-body">
        <span className="snack-type">{product.type}</span>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="snack-card-footer">
          <strong>${product.price.toFixed(2)}</strong>
          <button type="button" className="btn-add" onClick={() => onAdd(product)}>+ Agregar</button>
        </div>
      </div>
    </article>
  );
}

export default ProductoDulceria;
