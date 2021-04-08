import api from "../api/api";

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const fetchGetUser = async (id) => {
  const response = await api.get(`/user/${id}`);
  return response;
};

export const getUser = async (id) => {
  const response = await api.get(`/user/`);
  return response;
};

export const deleteUserById = async (id) => {
  const response = await api.delete(`/user/delete/${id}`);
  return response;
};

export const updateUser = async (id, data) => {
  const response = await api.post(`/user/update/${id}`, data, config);
  return response;
};
