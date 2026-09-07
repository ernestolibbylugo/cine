import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../config";

const PurchaseContext = createContext(null);
const STORAGE_KEY = "cine_ticket_history";

const readStoredTickets = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

export function PurchaseProvider({ children }) {
  const [ticketSales, setTicketSales] = useState(readStoredTickets);

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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ticketSales));
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

  return (
    <PurchaseContext.Provider value={{ ticketSales, addTicketSale }}>
      {children}
    </PurchaseContext.Provider>
  );
}

export const usePurchases = () => {
  const context = useContext(PurchaseContext);
  if (!context) throw new Error("usePurchases debe usarse dentro de PurchaseProvider");
  return context;
};
