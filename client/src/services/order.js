import api from "../api/api";

export const getOrder = async () => {
  const response = await api.get(`/order`);
  return response;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/order/${id}`);
  return response;
};

export const getOrderByUser = async (email) => {
  const response = await api.get(`/order/order-list/${email}`);
  return response;
};

export const createOrder = async (data) => {
  const response = await api.post(`/order`, data);
  return response;
};

export const deleteOrder = async (id) => {
  const response = await api.delete(`/order/delete/${id}`);
  return response;
};

export const updateOrder = async (id, data) => {
  const response = await api.post(`/order/update/${id}`, data);
  return response;
};
