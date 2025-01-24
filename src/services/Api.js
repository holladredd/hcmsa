import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://hcmsaserver.onrender.com/api";
const LOCAL_URL = "http://localhost:5001/api";

const api = axios.create({
  // baseURL: BASE_URL
  baseURL: LOCAL_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  signup: async ({ username, email, password }) => {
    const response = await api.post("/signup", { username, email, password });
    if (response.data.token) {
      await AsyncStorage.setItem("userToken", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  login: async ({ email, password }) => {
    const response = await api.post("/login", { email, password });
    if (response.data.token) {
      await AsyncStorage.setItem("userToken", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  refreshToken: async () => {
    const response = await api.post("/refresh-token");
    return response.data;
  },
};

export const users = {
  getAll: () => api.get("/users"),
  getOne: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

export const appointments = {
  getAll: () => api.get("/appointments"),
  create: (data) => api.post("/appointments", data),
  getOne: (id) => api.get(`/appointments/${id}`),
  update: (id, data) => api.put(`/appointments/${id}`, data),
  delete: (id) => api.delete(`/appointments/${id}`),
};

export const posts = {
  getAll: () => api.get("/posts"),
  create: (data) => api.post("/posts", data),
  getOne: (id) => api.get(`/posts/${id}`),
  update: (id, data) => api.put(`/posts/${id}`, data),
  delete: (id) => api.delete(`/posts/${id}`),
};

export const facilities = {
  getAll: () => api.get("/facilities"),
  create: (data) => api.post("/facilities", data),
  getOne: (id) => api.get(`/facilities/${id}`),
  update: (id, data) => api.put(`/facilities/${id}`, data),
  delete: (id) => api.delete(`/facilities/${id}`),
};

export const timeline = {
  getAll: () => api.get("/timeline"),
  create: (data) => api.post("/timeline", data),
  getOne: (id) => api.get(`/timeline/${id}`),
  update: (id, data) => api.put(`/timeline/${id}`, data),
  delete: (id) => api.delete(`/timeline/${id}`),
};

export const pregnancyTracking = {
  getAnalysis: (patientId) => api.get(`/pregnancy/analyze/${patientId}`),
  getWeeklyInsights: (patientId, week) =>
    api.get(`/pregnancy/insights/${patientId}/${week}`),
  updateData: (patientId, data) =>
    api.post(`/pregnancy/update/${patientId}`, data),
};

export default api;
