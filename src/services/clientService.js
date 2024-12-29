import api from "./api";

export const getClients = async () => {
  const response = await api.get("/client");
  return response.data;
};

export const addClient = async (client) => {
  const response = await api.post("/client", client);
  return response.data;
};
