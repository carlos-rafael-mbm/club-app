import api from "./api";

export const getRoles = async () => {
  const response = await api.get("/role");
  return response.data;
};
