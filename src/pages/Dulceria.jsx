import { useEffect, useState } from 'react';
import ProductoDulceria from '../components/ProductoDulceria';

const colors = ['yellow', 'red', 'orange', 'pink'];
const emojis = ['🍿', '🥤', '🍫', '🍬'];

const Dulceria = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/snacks')
      .then((response) => {
        if (!response.ok) throw new Error('No se pudo cargar la dulcería');
        return response.json();
      })
      .then((data) => setProducts(data.map((product, index) => ({
        ...product,
        type: product.type || 'Snack',
        description: product.description || 'Disfruta este producto durante tu función.',
        color: product.color || colors[index % colors.length],
        emoji: product.emoji || emojis[index % emojis.length],
        price: Number(product.price) || 0,
      }))))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="cinema-page">
      <section className="snack-hero"><div><span className="eyebrow">Dulcería del cine</span><h1>La película empieza antes de la película.</h1><p>Arma tu combo favorito y llévalo directo a tu función.</p></div><div className="cart-badge"><span>Tu orden</span><strong>{cart.length.toString().padStart(2, '0')}</strong></div></section>
      <div className="section-heading snack-heading"><div><span className="eyebrow">Para compartir</span><h2>Antojos de la casa</h2></div>{cart.length > 0 && <span className="cart-note">{cart.length} producto(s) agregado(s)</span>}</div>
      {loading && <p className="loading-session">Cargando dulcería...</p>}
      {error && <p className="error-message" role="alert">{error}. Verifica que JSON Server esté activo.</p>}
      {!loading && !error && products.length === 0 && <p className="info-card">No hay productos disponibles.</p>}
      {!loading && !error && products.length > 0 && <section className="snack-grid">{products.map((product) => <ProductoDulceria key={product.id} product={product} onAdd={(item) => setCart((current) => [...current, item])} />)}</section>}
    </div>
  );
};

export default Dulceria;