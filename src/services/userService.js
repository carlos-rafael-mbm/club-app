import api from "./api";

export const getUsers = async () => {
  const response = await api.get("/user");
  return response.data;
};

export const addUser = async (user) => {
  const response = await api.post("/user", user);
  return response.data;
};

export const updateUser = async (user) => {
  const response = await api.put("/user", user);
  return response.data;
};

export const deleteUser = async (id) => {
  await api.delete(`/user/${id}`);
};
