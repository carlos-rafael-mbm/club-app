import api from "./api";

export const getClientTypes = async () => {
  const response = await api.get("/client/types");
  return response.data;
};
