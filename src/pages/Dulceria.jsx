import { useState } from 'react';
import ProductoDulceria from '../components/ProductoDulceria';

const products = [
  { name: 'Palomitas clásicas', type: 'Favorito', description: 'Palomitas grandes con mantequilla.', price: 85, emoji: '🍿', color: 'yellow' },
  { name: 'Combo estreno', type: 'Combo', description: 'Palomitas grandes y dos refrescos.', price: 169, emoji: '🥤', color: 'red' },
  { name: 'Nachos con queso', type: 'Snack', description: 'Nachos crujientes con queso caliente.', price: 99, emoji: '🧀', color: 'orange' },
  { name: 'Gomitas surtidas', type: 'Dulce', description: 'Una mezcla dulce para compartir.', price: 69, emoji: '🍬', color: 'pink' },
];

function Dulceria() {
  const [cart, setCart] = useState([]);
  const addProduct = (product) => setCart((current) => [...current, product]);

  return (
    <div className="cinema-page">
      <section className="snack-hero"><div><span className="eyebrow">Dulcería del cine</span><h1>La película empieza antes de la película.</h1><p>Arma tu combo favorito y llévalo directo a tu función.</p></div><div className="cart-badge"><span>Tu orden</span><strong>{cart.length.toString().padStart(2, '0')}</strong></div></section>
      <div className="section-heading snack-heading"><div><span className="eyebrow">Para compartir</span><h2>Antojos de la casa</h2></div>{cart.length > 0 && <span className="cart-note">{cart.length} producto(s) agregado(s)</span>}</div>
      <section className="snack-grid">{products.map((product) => <ProductoDulceria key={product.name} product={product} onAdd={addProduct} />)}</section>
    </div>
  );
}

export default Dulceria;
