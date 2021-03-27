import api from "../api/api";

const config = {
  headers: {
    "content-type": "multipart/form-data",
  },
};

export const getProducts = async () => {
  const response = await api.get(`/products`);
  return response;
};

export const getCategory = async () => {
  const response = await api.get(`/category`);
  return response;
};

export const createCategory = async (data) => {
  const response = await api.post(`/category`, data);
  return response;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response;
};

export const countNewsView = async (id) => {
  const response = await api.post(`/products/count/${id}`);
  return response;
};

export const deleteProductById = async (id) => {
  const response = await api.delete(`/products/delete/${id}`);
  return response;
};

export const create = async (data) => {
  const response = await api.post(`/products`, data, config);
  return response;
};

export const deleteProductImg = async (id, data) => {
  const response = await api.post(`/products/deleteImg/${id}`, data);
  return response;
};

export const updateProduct = async (data, id) => {
  const response = await api.post(`/products/update/${id}`, data, config);
  return response;
};

export const createReview = async (data, id) => {
  const response = await api.post(`/products/review/${id}`, data);
  return response;
};
