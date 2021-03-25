import api from "../api/api";

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const fetchGetNews = async () => {
  const response = await api.get(`/news`);
  return response;
};

export const getNewsById = async (id) => {
  const response = await api.get(`/news/${id}`);
  return response;
};

export const countNewsView = async (id) => {
  const response = await api.post(`/news/count/${id}`);
  return response;
};

export const deleteNewsById = async (id) => {
  const response = await api.delete(`/news/delete/${id}`);
  return response;
};

export const postNews = async (data) => {
  const response = await api.post(`/news`, data, config);
  return response;
};

export const deleteNewsImg = async (id) => {
  const response = await api.post(`/news/delete/images/${id}`);
  return response;
};

export const updateNews = async (data, id) => {
  const response = await api.post(`/news/update/${id}`, data, config);
  return response;
};
