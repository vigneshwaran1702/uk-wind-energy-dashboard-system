import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
});

export const getActuals = async (start, end) => {
  const response = await api.get("/api/actuals/wind", {
    params: { start, end },
  });
  return response.data;
};

export const getForecasts = async (start, end) => {
  const response = await api.get("/api/forecasts/wind/latest", {
    params: { start, end },
  });
  return response.data;
};

export default api;
