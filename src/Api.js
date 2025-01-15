import axios from "axios";

// const API_URL_AUTH = "http://localhost:5000/api";
const API_URL_AUTH = "https://hcmsaserver.onrender.com";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL_AUTH,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  signup: async ({ email, password }) => {
    const response = await api.post("/users/signin", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  signin: async ({ name, email, password }) => {
    const response = await api.post("/users/signup", { name, email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};
// Add interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// // Example usage in your components:
// export const handleSignup = async (name, username, email, password) => {
//   try {
//     const userData = await auth.signup({ name, username, email, password });
//     return userData;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// export const handleSignin = async (email, password) => {
//   try {
//     const userData = await auth.signin({ email, password });
//     return userData;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// Keep the existing API endpoints
export const getHealthcareFacilities = async () => {
  const response = await api.get("/healthcare");
};

export const createAppointment = async (appointmentData) => {
  const response = await api.post("/appointments/schedule", appointmentData);
  return response.data;
};

export const getForumPosts = async () => {
  const response = await api.get("/forum/posts");
  return response.data;
};

export const createForumPost = async (postData) => {
  const response = await api.post("/forum/post", postData);
  return response.data;
};

export const getPregnancyTimeline = async () => {
  const response = await api.get("/timeline");
  return response.data;
};

export const addMilestone = async (milestoneData) => {
  const response = await api.post("/timeline/add", milestoneData);
  return response.data;
};
