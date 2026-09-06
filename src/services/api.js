import { API_URL } from "../config";

const request = async (path, options = {}) => {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`No se pudo completar la solicitud (${response.status})`);
  }

  return response.status === 204 ? null : response.json();
};

export const getMovies = () => request("/movies");
export const getShows = () => request("/shows");
export const getSeats = (showId) => request(`/seats?showId=${showId}`);
export const getSnacks = () => request("/snacks");
export const createPurchase = (purchase) =>
  request("/purchases", {
    method: "POST",
    body: JSON.stringify({
      ...purchase,
      createdAt: new Date().toISOString(),
    }),
  });
