import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../config";
import useLocalStorage from "../hooks/useLocalStorage";

const PurchaseContext = createContext(null);
const TICKET_STORAGE_KEY = "cine_ticket_history";
const CART_STORAGE_KEY = "cine-sein-cart";

const readStoredTickets = () => {
  try {
    return JSON.parse(localStorage.getItem(TICKET_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

export function PurchaseProvider({ children }) {
  // Historial de entradas vendidas (usado por Dashboard y ResumenCompra)
  const [ticketSales, setTicketSales] = useState(readStoredTickets);

  // Carrito de dulcería (API adicional, sin romper el historial)
  const [items, setItems] = useLocalStorage(CART_STORAGE_KEY, []);

  useEffect(() => {
    let active = true;
    fetch(`${API_URL}/purchases`)
      .then((response) => (response.ok ? response.json() : []))
      .then((purchases) => {
        if (!active) return;
        setTicketSales((current) => {
          const merged = [...purchases, ...current].filter(
            (purchase, index, list) => list.findIndex((item) => item.id === purchase.id) === index,
          );
          return merged.sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));
        });
      })
      .catch(() => undefined);

    return () => { active = false; };
  }, []);

  useEffect(() => {
    localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(ticketSales));
  }, [ticketSales]);

  const addTicketSale = (purchase) => {
    const sale = {
      ...purchase,
      id: purchase.id || `local-${Date.now()}`,
      createdAt: purchase.createdAt || new Date().toISOString(),
    };
    setTicketSales((current) => [sale, ...current.filter((item) => item.id !== sale.id)]);
    return sale;
 };

  const addItem = (item, quantity = 1) => setItems((current) => {
    const existing = current.find((cartItem) => cartItem.id === item.id);
    return existing ? current.map((cartItem) => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + quantity } : cartItem) : [...current, { ...item, quantity }];
  });
  const updateQuantity = (id, quantity) => setItems((current) => quantity < 1 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item));
  const clearCart = () => setItems([]);
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const value = { ticketSales, addTicketSale, items, addItem, updateQuantity, clearCart, cartCount };

  return (
    <PurchaseContext.Provider value={value}>
      {children}
    </PurchaseContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePurchases = () => {
  const context = useContext(PurchaseContext);
  if (!context) throw new Error("usePurchases debe usarse dentro de PurchaseProvider");
  return context;
};

