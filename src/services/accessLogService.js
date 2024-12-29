import api from "./api";

export const getAccessLogs = async (filters) => {
  const response = await api.get("/accesslog", { params: filters });
  return response.data;
};

export const registerEntry = async (log) => {
  const response = await api.post("/accesslog/register-entry", log);
  return response.data;
};

export const registerExit = async (log) => {
  const response = await api.post(`/accesslog/register-exit`, log);
  return response.data;
};
