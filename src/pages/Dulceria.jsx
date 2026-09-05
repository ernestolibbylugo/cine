<<<<<<< HEAD
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
=======
<<<<<<< HEAD
=======
import { useEffect, useState } from "react";

>>>>>>> 4dea81b833245d2df20128e5113189ef4f53562c
function Dulceria() {
  const [snacks, setSnacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/snacks")
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

  if (loading) {
    return <p>Cargando dulcería...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main>
      <h1>Dulcería</h1>

      {snacks.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div>
          {snacks.map((snack) => (
            <article key={snack.id}>
              <h2>{snack.name}</h2>
              <p>Precio: ₡{snack.price}</p>
            </article>
          ))}
        </div>
      )}
    </main>
>>>>>>> f9b822cad42e2b596bce367b4d0328697f77ccfc
  );
}

export default Dulceria;