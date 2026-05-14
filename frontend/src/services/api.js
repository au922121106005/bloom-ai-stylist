import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api'
});

// attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* =========================
   PRODUCT APIs
========================= */
export const getProducts = () => API.get('/products/');
export const getProduct = (id) => API.get(`/products/${id}/`);

/* =========================
   CART APIs
========================= */
export const addToCart = (data) => API.post('/cart/', data);
export const getCart = () => API.get('/cart/');
export const removeFromCart = (id) => API.delete(`/cart/${id}/`);

/* =========================
   ORDER APIs
========================= */
export const createOrder = (data) => API.post('/orders/', data);
export const getOrders = () => API.get('/orders/');

/* =========================
   AUTH APIs
========================= */
export const loginUser = (data) => API.post('/users/login/', data);
export const registerUser = (data) => API.post('/users/register/', data);
export const resetPassword = (data) => API.post('/users/reset-password/', data);

/* =========================
   FEEDBACK APIs
========================= */
export const getFeedbacks = () => API.get('/feedback/');
export const getFeaturedFeedbacks = () => API.get('/feedback/featured/');
export const createFeedback = (data) => API.post('/feedback/', data);
export const getFeedback = (id) => API.get(`/feedback/${id}/`);
export const updateFeedback = (id, data) => API.put(`/feedback/${id}/`, data);
export const deleteFeedback = (id) => API.delete(`/feedback/${id}/`);

/* =========================
   CHATBOT API (IMPORTANT FIX)
========================= */
export const sendChatMessage = (message) =>
  API.post('/chat/', { message });

export default API;