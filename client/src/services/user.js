import api from "../api/api";

export const fetchGetUser = async (id) => {
  const response = await api.get(`/user/${id}`);
  return response;
};

export const getUser = async (id) => {
  const response = await api.get(`/user/`);
  return response;
};